import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export const animate = () => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: '.scroll',
        start: 'top top',
        end: '90% bottom',
        // markers: true,
        scrub: true,
      },
    })
    .to('.scroll__intro', { opacity: 0, duration: 2 })
    .from('.grid', { scale: 5, duration: 5 }, '-=')
    .from('.row:nth-child(even)', { xPercent: -100, duration: 5 }, '-=')
    .from('.row:nth-child(odd)', { xPercent: 100, duration: 5 }, '-=');
};
