import React, { useState, useRef, useEffect } from 'react';

const ResizableHeader = ({ children, width, index, onResize }) => {
  const [colWidth, setColWidth] = useState(width?? 70);
  useEffect(()=> onResize(index, colWidth), [colWidth])
  const startPos = useRef(0);

  const handleMouseDown = (e) => {
    startPos.current = e.pageX;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const diff = e.pageX - startPos.current;
    startPos.current = e.pageX;
    setColWidth((size) => size + diff);
  };

  const handleMouseUp = () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    // onResize(index, colWidth)
  };

  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div
      className='th'
      style={{ width: colWidth }}
    >
      {children}
      <span
        onMouseDown={handleMouseDown}
        className='resizer'
      />
    </div>
  );
}

export default ResizableHeader;
