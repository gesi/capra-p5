const p5url = 'https://unpkg.com/p5@0.8.0/lib/p5.js';
export const loadP5 = async () => {
  return new Promise(resolve => {
    const script = document.createElement('script');
    script.src = p5url;
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
};

export const removeP5 = () => {
  typeof remove === 'function' && remove();
  const script = document.querySelector(`script[src="${p5url}"]`);
  if (script) {
    script.parentElement.removeChild(script);
  }
};
