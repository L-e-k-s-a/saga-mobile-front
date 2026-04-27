import React, { useMemo } from 'react';
import { View, Dimensions } from 'react-native';
import { Canvas, Circle, Line, Text as SkiaText, Group } from '@shopify/react-native-skia';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');


const calculateTreeLayout = (people: any, rootId: any) => {

  let root = null;
  if (rootId) {
    root = people.find((p: any) => p.id === rootId);
  } else {
    root = people.find((p: any) => !p.parents || p.parents.length === 0);
  }
  
  if (!root) return { nodes: [], edges: [] };
  
  // Рекурсивная функция для расчета позиций
  const nodes: any= [];
  const edges: any = [];
  const LEVEL_HEIGHT = 120;
  const NODE_WIDTH = 100;
  
  function traverse(person: any, x: any, level: any, visited = new Set()) {
    if (visited.has(person.id)) return;
    visited.add(person.id);
    
    nodes.push({
      id: person.id,
      x: x,
      y: level * LEVEL_HEIGHT,
      name: person.name,
      gender: person.gender,
      birthDate: person.birthDate,
    });
    
    // Обрабатываем детей
    if (person.children && person.children.length > 0) {
      const children = people.filter((p: any)=> person.children.includes(p.id));
      const totalWidth = (children.length - 1) * NODE_WIDTH;
      const startX = x - totalWidth / 2;
      
      children.forEach((child: any, index: any) => {
        const childX = startX + index * NODE_WIDTH;
        edges.push({
          from: { x: x, y: level * LEVEL_HEIGHT },
          to: { x: childX, y: (level + 1) * LEVEL_HEIGHT }
        });
        traverse(child, childX, level + 1, visited);
      });
    }
    
    // Обрабатываем супругов (рядом на том же уровне)
    if (person.spouse && person.spouse.length > 0) {
      const spouses = people.filter((p: any) => person.spouse.includes(p.id));
      spouses.forEach((spouse: any, index: any) => {
        if (!visited.has(spouse.id)) {
          const spouseX = x + (index + 1) * 80;
          nodes.push({
            id: spouse.id,
            x: spouseX,
            y: level * LEVEL_HEIGHT,
            name: spouse.name,
            gender: spouse.gender,
          });
          edges.push({
            from: { x: x, y: level * LEVEL_HEIGHT },
            to: { x: spouseX, y: level * LEVEL_HEIGHT },
            isSpouse: true
          });
          visited.add(spouse.id);
        }
      });
    }
  }
  
  traverse(root, 0, 0);
  
  return { nodes, edges };
};

export const Genealogy = ({ data }: any) => {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedScale = useSharedValue(1);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);
  
  // Вычисляем layout на основе полученных данных
  const { nodes, edges } = useMemo(() => {
    if (!data || !data.people) {
      return { nodes: [], edges: [] };
    }
    return calculateTreeLayout(data.people, data.rootId);
  }, [data]);
  
  const panGesture = Gesture.Pan()
    .minDistance(1)
    .onUpdate((event) => {
      translateX.value = savedTranslateX.value + event.translationX;
      translateY.value = savedTranslateY.value + event.translationY;
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });
  
  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = savedScale.value * event.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });
  
  const composedGestures = Gesture.Race(panGesture, pinchGesture);
  
  return (
    <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
      <GestureDetector gesture={composedGestures}>
        <Canvas style={{ flex: 1 }}>
          <Group
            transform={[
              { translateX: translateX.value + WIDTH / 2 },
              { translateY: translateY.value + HEIGHT / 2 },
              { scale: scale.value },
            ]}
          >
            {/* Рисуем связи */}
            {edges.map((edge: any, index: any) => (
              <Line
                key={`edge-${index}`}
                p1={{ x: edge.from.x, y: edge.from.y }}
                p2={{ x: edge.to.x, y: edge.to.y }}
                strokeWidth={edge.isSpouse ? 2 : 2}
                color={edge.isSpouse ? "#FF6B6B" : "#666"}
                style="stroke"
              />
            ))}
            
            {/* Рисуем узлы */}
            {nodes.map((node: any) => (
              <Group key={node.id}>
                <Circle
                  cx={node.x}
                  cy={node.y}
                  r={40}
                  color={node.gender === 'male' ? "#4CAF50" : "#FF9800"}
                />
                <Circle
                  cx={node.x}
                  cy={node.y}
                  r={38}
                  color="#fff"
                />
                <SkiaText
                  x={node.x - 30}
                  y={node.y + 5}
                  text={node.name}
                  color="#333"
                  font={null}
                />
                {node.birthDate && (
                  <SkiaText
                    x={node.x - 25}
                    y={node.y + 25}
                    text={node.birthDate}
                    color="#666"
                    font={null}
                  />
                )}
              </Group>
            ))}
          </Group>
        </Canvas>
      </GestureDetector>
    </View>
  );
};