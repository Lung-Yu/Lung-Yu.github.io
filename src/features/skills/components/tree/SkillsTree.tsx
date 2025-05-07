import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSkillsTree } from '../../hooks/useSkillsTree';
import '../../styles/tree/SkillsTree.css';
import type { SkillNode } from '../../types/tree';

// 節點位置的界面定義
interface Position {
  x: number;
  y: number;
}

// 定義連線樣式枚舉
enum ConnectionStyle {
  SOLID = 'solid',
  DOTTED = 'dotted',
  DASHED = 'dashed',
  WAVY = 'wavy'
}

// 改進的連線組件 - 實現點到點最短距離連線
const ConnectionLine: React.FC<{ 
  // 起始和結束點座標
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  
  // 連線設置
  connectionLevel: number;
  childType?: string;
}> = ({ 
  startX,
  startY,
  endX,
  endY,
  connectionLevel,
  childType
}) => {
  // 根據層級決定連線樣式
  const getConnectionStyle = (): ConnectionStyle => {
    // 固定規律：每個層級都有特定的連線樣式
    switch (connectionLevel % 4) {
      case 0: return ConnectionStyle.SOLID;
      case 1: return ConnectionStyle.DOTTED;
      case 2: return ConnectionStyle.DASHED; 
      case 3: return ConnectionStyle.WAVY;
      default: return ConnectionStyle.SOLID;
    }
  };
  
  // 根據子節點的技能級別設置連線顏色
  const getLineColor = (): string => {
    switch (childType) {
      case 'basic': return '#a3c4f3';
      case 'intermediate': return '#8ccc85';
      case 'advanced': return '#f193a5';
      case 'expert': return '#ffc107';
      default: return '#ddd';
    }
  };
  
  // 計算連線長度和角度
  const dx = endX - startX;
  const dy = endY - startY;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  
  // 獲取連線樣式類名
  const style = getConnectionStyle();
  const styleClass = `connection-${style}`;
  
  return (
    <div
      className={`connection-line ${styleClass}`}
      style={{
        position: 'absolute',
        left: `${startX}px`,
        top: `${startY}px`,
        width: `${length}px`,
        height: '2px',
        backgroundColor: getLineColor(),
        transformOrigin: 'left center',
        transform: `rotate(${angle}deg)`,
      }}
    />
  );
};

// 個別樹節點組件
const TreeNode: React.FC<{ 
  node: SkillNode; 
  level: number;
  position?: Position;
  angle?: number;
  distance?: number;
  expandAll: boolean;
  collapseAll: boolean;
  resetTrigger: number;
  nodeId: string;
  savedPositions: Record<string, Position>;
  onNodeDragged: (id: string, position: Position) => void;
}> = ({ 
  node, 
  level, 
  position,
  angle = 0,
  distance = 300,
  expandAll, 
  collapseAll, 
  resetTrigger,
  nodeId,
  savedPositions,
  onNodeDragged
}) => {
  const { t } = useTranslation('skills');
  const [expanded, setExpanded] = useState(level < 2);
  const nodeRef = useRef<HTMLDivElement>(null);
  const [children, setChildren] = useState<{ node: SkillNode, position: Position, nodeId: string }[]>([]);
  const [connections, setConnections] = useState<{ start: Position, end: Position }[]>([]);
  const hasChildren = node.children && node.children.length > 0;
  
  // 拖拽相關狀態
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  
  // 使用保存的位置或初始位置
  const [nodePosition, setNodePosition] = useState<Position>(
    savedPositions[nodeId] || position || { x: 0, y: 0 }
  );
  
  // 處理展開/收起所有
  useEffect(() => {
    if (expandAll && hasChildren) {
      setExpanded(true);
    }
  }, [expandAll, hasChildren]);
  
  useEffect(() => {
    if (collapseAll && hasChildren && level > 0) {
      setExpanded(false);
    }
  }, [collapseAll, hasChildren, level]);
  
  // 重置為預設狀態
  useEffect(() => {
    setExpanded(level < 2);
    // 只在重置時才回到初始位置
    if (resetTrigger > 0 && position) {
      setNodePosition(position);
    }
  }, [resetTrigger, level, position]);

  // 從savedPositions更新位置（只有在有變化時）
  useEffect(() => {
    if (savedPositions[nodeId] && !isDragging) {
      setNodePosition(savedPositions[nodeId]);
    } 
    // 如果沒有保存位置，但有提供初始位置，並且不是在拖拽，則使用初始位置
    else if (!savedPositions[nodeId] && position && level !== 0 && !isDragging) {
      setNodePosition(position);
    }
  }, [savedPositions, nodeId, position, level, isDragging]);
  
  // 計算子節點位置 (優化防止重疊)
  useEffect(() => {
    if (!expanded || !hasChildren || !node.children || !nodeRef.current) return;
    
    const newChildren: { node: SkillNode, position: Position, nodeId: string }[] = [];
    const newConnections: { start: Position, end: Position }[] = [];
    
    // 獲取當前節點的尺寸
    const parentNodeRect = nodeRef.current.getBoundingClientRect();
    const parentWidth = parentNodeRect.width;
    const parentHeight = parentNodeRect.height;
    
    // 父節點的中心點已經是座標系統的原點 (0,0)
    
    // 根據級別計算不同的放射距離和角度增量
    const childDistance = distance - level * 40;
    const totalChildren = node.children.length;
    
    // 較少的子節點使用較大的角度範圍，避免過度集中
    const angleRange = level === 0 ? 360 : Math.min(180, 60 + totalChildren * 15);
    const angleStep = angleRange / Math.max(1, totalChildren);
    const startAngle = level === 0 ? 0 : angle - angleRange / 2;

    // 用於防止重疊的最小節點距離
    const minNodeDistance = 80;
    
    // 先計算初始位置
    const initialPositions: Position[] = node.children.map((_, index) => {
      const childAngle = startAngle + (index + 1) * angleStep;
      const radians = childAngle * (Math.PI / 180);
      
      // 根據節點數量調整距離
      const childDistanceMultiplier = 1 + level * 0.2;
      const adjustedDistance = childDistance * childDistanceMultiplier * (1 + (index % 2) * 0.2);
      
      return {
        x: adjustedDistance * Math.cos(radians),
        y: adjustedDistance * Math.sin(radians)
      };
    });
    
    // 避免重疊的簡單算法（將重疊的節點拉開）
    const adjustPositionsForOverlap = (positions: Position[]): Position[] => {
      const adjusted = [...positions];
      
      // 多次迭代以逐步調整位置
      for (let iteration = 0; iteration < 3; iteration++) {
        for (let i = 0; i < adjusted.length; i++) {
          for (let j = i + 1; j < adjusted.length; j++) {
            // 計算兩個節點之間的距離
            const dx = adjusted[j].x - adjusted[i].x;
            const dy = adjusted[j].y - adjusted[i].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // 如果節點太近，根據它們之間的向量方向移動它們
            if (distance < minNodeDistance) {
              const adjustRatio = (minNodeDistance - distance) / (2 * distance);
              
              // 計算移動向量
              const moveX = dx * adjustRatio;
              const moveY = dy * adjustRatio;
              
              // 將節點拉開
              adjusted[i].x -= moveX;
              adjusted[i].y -= moveY;
              adjusted[j].x += moveX;
              adjusted[j].y += moveY;
            }
          }
        }
      }
      
      return adjusted;
    };
    
    // 調整位置以避免重疊
    const adjustedPositions = adjustPositionsForOverlap(initialPositions);
    
    // 使用調整後的位置建立子節點和連接
    node.children.forEach((child, index) => {
      // 為每個子節點創建唯一ID
      const childId = `${nodeId}-child-${index}`;
      
      // 決定位置：優先使用已保存的位置，其次是計算的位置
      const childPosition = savedPositions[childId] || adjustedPositions[index];
      
      newChildren.push({
        node: child,
        position: childPosition,
        nodeId: childId
      });
      
      // 計算從父節點邊緣到子節點位置的連線
      const dx = childPosition.x;
      const dy = childPosition.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // 父節點邊緣比例 (簡單估計邊緣位置)
      const parentNodeRadius = Math.min(parentWidth, parentHeight) / 2 * 0.9;
      const edgeRatio = parentNodeRadius / distance;
      
      // 計算從邊緣出發的起點 (近似估計)
      const startPoint = {
        x: dx * edgeRatio,
        y: dy * edgeRatio
      };
      
      // 連線從父節點邊緣到子節點的實際位置
      newConnections.push({
        start: startPoint,
        end: childPosition
      });
    });
    
    setChildren(newChildren);
    setConnections(newConnections);
  }, [expanded, hasChildren, node.children, level, angle, distance, nodeId, savedPositions, nodeRef]);

  const getLevelClass = (skillLevel?: string) => {
    switch (skillLevel) {
      case 'basic': return 'skill-level-basic';
      case 'intermediate': return 'skill-level-intermediate';
      case 'advanced': return 'skill-level-advanced';
      case 'expert': return 'skill-level-expert';
      default: return '';
    }
  };
  
  const getTranslatedLevel = (skillLevel?: string) => {
    if (!skillLevel) return '';
    return t(`skillTree.levels.${skillLevel}`, skillLevel);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      setExpanded(!expanded);
    }
  };

  // 拖拽處理函數
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (level === 0) return; // 不允許拖動根節點
    
    // 避免觸發其他事件
    e.stopPropagation();
    
    // 只在節點標題處初始化拖拽
    if (!(e.target as HTMLElement).closest('.skill-node-header')) return;
    
    // 避免切換展開/折疊狀態
    if (hasChildren) e.preventDefault();
    
    const rect = nodeRef.current!.getBoundingClientRect();
    
    // 計算鼠標在元素內的相對位置
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    setIsDragging(true);
  }, [level, hasChildren]);
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const parentRect = nodeRef.current?.parentElement?.getBoundingClientRect();
    if (!parentRect) return;
    
    // 計算新位置（相對於父元素）
    const newX = e.clientX - parentRect.left - dragOffset.x;
    const newY = e.clientY - parentRect.top - dragOffset.y;
    
    // 更新節點位置
    setNodePosition({ x: newX, y: newY });
  }, [isDragging, dragOffset]);
  
  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      // 拖拽結束時，通知父組件保存位置
      onNodeDragged(nodeId, nodePosition);
      setIsDragging(false);
    }
  }, [isDragging, nodeId, nodePosition, onNodeDragged]);
  
  // 添加和移除事件監聽器
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);
  
  // 為根節點設置絕對定位樣式
  const rootStyle = level === 0 ? {} : {
    transform: `translate(${nodePosition.x}px, ${nodePosition.y}px)`,
    cursor: isDragging ? 'grabbing' : 'grab'
  };

  return (
    <div 
      className={`skill-node skill-node-level-${level} ${getLevelClass(node.level)} ${isDragging ? 'dragging' : ''}`} 
      style={rootStyle}
      ref={nodeRef}
      onMouseDown={handleMouseDown}
      id={nodeId}
    >
      <div 
        className={`skill-node-header ${hasChildren ? 'has-children' : ''}`}
        onClick={level === 0 ? handleToggle : undefined}
      >
        <span className="skill-node-name">{node.name}</span>
        {node.level && <span className={`skill-node-level-badge ${getLevelClass(node.level)}`}>{getTranslatedLevel(node.level)}</span>}
      </div>
      
      {hasChildren && (
        <div 
          className={`skill-node-toggle ${expanded ? 'expanded' : 'collapsed'}`}
          onClick={handleToggle}
        >
          {expanded ? '−' : '+'}
        </div>
      )}
      
      {expanded && hasChildren && (
        <>
          {connections.map((conn, idx) => {
            return (
              <ConnectionLine 
                key={`conn-${idx}`}
                startX={conn.start.x}
                startY={conn.start.y}
                endX={conn.end.x}
                endY={conn.end.y}
                connectionLevel={level}
                childType={children[idx]?.node.level}
              />
            );
          })}
          
          <div className="skill-node-children">
            {children.map((childData, index) => (
              <TreeNode 
                key={childData.nodeId}
                node={childData.node} 
                level={level + 1}
                position={childData.position}
                angle={angle + (index + 1) * (360 / (node.children?.length || 1))}
                distance={distance * 0.7}
                expandAll={expandAll} 
                collapseAll={collapseAll} 
                resetTrigger={resetTrigger}
                nodeId={childData.nodeId}
                savedPositions={savedPositions}
                onNodeDragged={onNodeDragged}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export const SkillsTree: React.FC = () => {
  const { t } = useTranslation('skills');
  const { skillTreeData, loading } = useSkillsTree();
  const [expandAllFlag, setExpandAllFlag] = useState(false);
  const [collapseAllFlag, setCollapseAllFlag] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const mindMapRef = useRef<HTMLDivElement>(null);
  
  // 拖拽相關狀態 - 保存所有節點的位置
  const [nodePositions, setNodePositions] = useState<Record<string, Position>>({});
  const [scale, setScale] = useState(1);
  const [panning, setPanning] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPanPos, setStartPanPos] = useState({ x: 0, y: 0 });
  
  // 儲存節點拖拽位置
  const handleNodeDragged = useCallback((id: string, position: Position) => {
    setNodePositions(prev => ({
      ...prev,
      [id]: position
    }));
  }, []);

  // 重置標誌
  useEffect(() => {
    if (expandAllFlag) {
      const timer = setTimeout(() => setExpandAllFlag(false), 100);
      return () => clearTimeout(timer);
    }
  }, [expandAllFlag]);

  useEffect(() => {
    if (collapseAllFlag) {
      const timer = setTimeout(() => setCollapseAllFlag(false), 100);
      return () => clearTimeout(timer);
    }
  }, [collapseAllFlag]);
  
  const handleExpandAll = () => {
    setCollapseAllFlag(false);
    setExpandAllFlag(true);
  };
  
  const handleCollapseAll = () => {
    setExpandAllFlag(false);
    setCollapseAllFlag(true);
  };
  
  const handleReset = () => {
    setExpandAllFlag(false);
    setCollapseAllFlag(false);
    setNodePositions({}); // 清除所有保存的位置
    setScale(1);
    setPanning({ x: 0, y: 0 });
    setResetTrigger(prev => prev + 1);
  };
  
  // 處理縮放功能
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    
    // 計算縮放因子
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.min(Math.max(0.5, scale * delta), 2.5);
    
    setScale(newScale);
  }, [scale]);
  
  // 處理平移
  const handleMapMouseDown = useCallback((e: React.MouseEvent) => {
    // 只有在直接點擊背景時才啟動平移功能
    if ((e.target as HTMLElement).className === 'mind-map' ||
        (e.target as HTMLElement).className === 'skills-tree-content') {
      e.preventDefault();
      setIsPanning(true);
      setStartPanPos({ x: e.clientX, y: e.clientY });
    }
  }, []);
  
  const handleMapMouseMove = useCallback((e: MouseEvent) => {
    if (!isPanning) return;
    
    setPanning(prev => ({
      x: prev.x + (e.clientX - startPanPos.x) / scale,
      y: prev.y + (e.clientY - startPanPos.y) / scale
    }));
    
    setStartPanPos({ x: e.clientX, y: e.clientY });
  }, [isPanning, startPanPos, scale]);
  
  const handleMapMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);
  
  // 添加和移除平移事件監聽器
  useEffect(() => {
    if (isPanning) {
      window.addEventListener('mousemove', handleMapMouseMove);
      window.addEventListener('mouseup', handleMapMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMapMouseMove);
      window.removeEventListener('mouseup', handleMapMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMapMouseMove);
      window.removeEventListener('mouseup', handleMapMouseUp);
    };
  }, [isPanning, handleMapMouseMove, handleMapMouseUp]);

  // 嘗試從 localStorage 恢復保存的節點位置
  useEffect(() => {
    try {
      const savedPositions = localStorage.getItem('skillTreeNodePositions');
      if (savedPositions) {
        setNodePositions(JSON.parse(savedPositions));
      }
    } catch (error) {
      console.error('Error loading saved node positions:', error);
    }
  }, []);

  // 保存節點位置到 localStorage
  useEffect(() => {
    if (Object.keys(nodePositions).length > 0) {
      try {
        localStorage.setItem('skillTreeNodePositions', JSON.stringify(nodePositions));
      } catch (error) {
        console.error('Error saving node positions:', error);
      }
    }
  }, [nodePositions]);

  if (loading || !skillTreeData) {
    return (
      <section className="skills-tree" id="skills-tree">
        <div className="skills-tree-container">
          <div className="skills-tree-header">
            <h2>{t('skillTree.title', 'Skills Tree')}</h2>
            <p>{t('skillTree.description', 'Interactive visualization of my technical skills')}</p>
          </div>
          <div className="skills-tree-loading">Loading skills tree...</div>
        </div>
      </section>
    );
  }

  const { title, description, root } = skillTreeData.skillTree;
  const rootNodeId = 'root-node';

  return (
    <section className="skills-tree" id="skills-tree">
      <div className="skills-tree-container">
        <div className="skills-tree-header">
          <h2>{title}</h2>
          <p>{description}</p>
          
          <div className="skills-tree-controls">
            <button className="tree-control-btn" onClick={handleExpandAll}>
              {t('skillTree.expandAll', 'Expand All')}
            </button>
            <button className="tree-control-btn" onClick={handleCollapseAll}>
              {t('skillTree.collapseAll', 'Collapse All')}
            </button>
            <button className="tree-control-btn" onClick={handleReset}>
              {t('skillTree.reset', 'Reset')}
            </button>
            <div className="zoom-controls">
              <button className="tree-control-btn" onClick={() => setScale(prev => Math.min(prev * 1.2, 2.5))}>
                +
              </button>
              <button className="tree-control-btn" onClick={() => setScale(prev => Math.max(prev / 1.2, 0.5))}>
                -
              </button>
            </div>
          </div>
        </div>

        <div className="skills-tree-visualization">
          <div className="skills-tree-legend">
            <div className="legend-title">{t('skillTree.proficiencyLevels', 'Proficiency Levels')}: </div>
            <div className="legend-items-container">
              <div className="legend-item">
                <span className="legend-color skill-level-basic"></span>
                <span className="legend-label">{t('skillTree.levels.basic', 'Basic')}</span>
              </div>
              <div className="legend-item">
                <span className="legend-color skill-level-intermediate"></span>
                <span className="legend-label">{t('skillTree.levels.intermediate', 'Intermediate')}</span>
              </div>
              <div className="legend-item">
                <span className="legend-color skill-level-advanced"></span>
                <span className="legend-label">{t('skillTree.levels.advanced', 'Advanced')}</span>
              </div>
              <div className="legend-item">
                <span className="legend-color skill-level-expert"></span>
                <span className="legend-label">{t('skillTree.levels.expert', 'Expert')}</span>
              </div>
            </div>
          </div>

          <div className="skills-tree-legend connection-legend">
            <div className="legend-title">{t('skillTree.connectionTypes', 'Connection Types')}: </div>
            <div className="legend-items-container">
              <div className="legend-item">
                <span className="legend-connection connection-solid-sample"></span>
                <span className="legend-label">{t('skillTree.connections.solid', 'Level 1')}</span>
              </div>
              <div className="legend-item">
                <span className="legend-connection connection-dotted-sample"></span>
                <span className="legend-label">{t('skillTree.connections.dotted', 'Level 2')}</span>
              </div>
              <div className="legend-item">
                <span className="legend-connection connection-dashed-sample"></span>
                <span className="legend-label">{t('skillTree.connections.dashed', 'Level 3')}</span>
              </div>
              <div className="legend-item">
                <span className="legend-connection connection-wavy-sample"></span>
                <span className="legend-label">{t('skillTree.connections.wavy', 'Level 4+')}</span>
              </div>
            </div>
          </div>

          <div className="skills-tree-content" onMouseDown={handleMapMouseDown}>
            <div 
              className="mind-map" 
              ref={mindMapRef}
              onWheel={handleWheel}
              style={{
                transform: `scale(${scale}) translate(${panning.x}px, ${panning.y}px)`,
                transformOrigin: 'center'
              }}
            >
              <TreeNode 
                node={root} 
                level={0} 
                expandAll={expandAllFlag} 
                collapseAll={collapseAllFlag} 
                resetTrigger={resetTrigger}
                nodeId={rootNodeId}
                savedPositions={nodePositions}
                onNodeDragged={handleNodeDragged}
              />
            </div>
          </div>
          
          <div className="skills-tree-instructions">
            <p>{t('skillTree.instructions', 'Drag nodes to rearrange. Use mouse wheel to zoom in/out.')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsTree;
