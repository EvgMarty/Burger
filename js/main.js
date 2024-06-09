document.addEventListener('DOMContentLoaded', () => {
  const burgerContainer = document.querySelector('.header');
  const burgerParts = document.querySelectorAll('.burger');

  // begining position
  const initialPositions = {
    'burger--footer-bun': { x: -50, y: 50, rotation: -15 },
    'burger--mayo': { x: -55, y: 40, rotation: 10 },
    'burger--salad': { x: -60, y: 30, rotation: -10 },
    'burger--cheese': { x: -65, y: 20, rotation: 5 },
    'burger--onion': { x: -70, y: 10, rotation: -5 },
    'burger--cutlet': { x: -75, y: 0, rotation: 15 },
    'burger--chicken_cutlet': { x: -80, y: -10, rotation: -10 },
    'burger--tomato': { x: -85, y: -20, rotation: 5 },
    'burger--cutlet-2': { x: -90, y: -30, rotation: -5 },
    'burger--cheese-2': { x: -95, y: -40, rotation: 10 },
    'burger--cucumbers': { x: -100, y: -50, rotation: -15 },
    'burger--onion-2': { x: -105, y: -60, rotation: 20 },
    'burger--salad-2': { x: -110, y: -70, rotation: -20 },
    'burger--mayo-2': { x: -115, y: -80, rotation: 15 },
    'burger--top-bun': { x: -120, y: -90, rotation: -10 },
  };

  // mouse event
  burgerContainer.addEventListener('mousemove', (e) => {
    const containerWidth = burgerContainer.offsetWidth;
    const mouseX = e.clientX - burgerContainer.getBoundingClientRect().left;
    const mousePercentage = mouseX / containerWidth;

    burgerParts.forEach((part) => {
      const partClass = part.classList[1];
      const initialRotation = initialPositions[partClass].rotation;

      if (mousePercentage > 0.5) {
        gsap.to(part, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.5,
        });
      } else {
        gsap.to(part, {
          x: initialPositions[partClass].x,
          y: initialPositions[partClass].y,
          rotation: initialRotation * (1 - 2 * mousePercentage),
          duration: 0.5,
        });
      }
    });
  });
});




