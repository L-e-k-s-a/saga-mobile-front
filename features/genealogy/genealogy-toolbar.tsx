// components/CanvasToolbar.tsx
import { Tool, ToolType } from '@/shared/types/canvas';
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CanvasToolbarProps {
  currentTool: ToolType;
  onToolChange: (tool: ToolType) => void;
}

const tools: Tool[] = [
  { id: 'pan', label: '✋', name: 'Перемещение' },
  { id: 'triangle', label: '△', name: 'Треугольник' },
  { id: 'rectangle', label: '□', name: 'Прямоугольник' },
  { id: 'circle', label: '○', name: 'Круг' },
  { id: 'arrow', label: '→', name: 'Стрелка' },
  { id: 'connection', label: '🔗', name: 'Связи' },
];

export const GenealogyToolbar: React.FC<CanvasToolbarProps> = ({ 
  currentTool, 
  onToolChange 
}) => {
  return (
    <View style={styles.container}>
      {tools.map((tool) => (
        <TouchableOpacity
          key={tool.id}
          style={[
            styles.toolButton,
            currentTool === tool.id && styles.activeTool,
          ]}
          onPress={() => onToolChange(tool.id)}
        >
          <Text style={styles.toolIcon}>{tool.label}</Text>
          <Text style={styles.toolName}>{tool.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1000,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  toolButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginVertical: 2,
  },
  activeTool: {
    backgroundColor: '#e3f2fd',
  },
  toolIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  toolName: {
    fontSize: 14,
  },
});