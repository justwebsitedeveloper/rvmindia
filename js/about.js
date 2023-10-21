gsap.timeline({ repeat: -1 })
    .to('.about-great__cloud--cloud1', 5, { x: 10 })
    .to('.about-great__cloud--cloud1', 5, { x: -10 })
    .to('.about-great__cloud--cloud1', 5, { x: 0 })

gsap.timeline({ repeat: -1 })
    .to('.about-great__cloud--cloud2', 3, { x: -10 })
    .to('.about-great__cloud--cloud2', 8, { x: 10 })
    .to('.about-great__cloud--cloud2', 1, { x: 0 })