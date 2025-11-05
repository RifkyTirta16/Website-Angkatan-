 
        document.addEventListener('DOMContentLoaded', () => {

            // Mobile Menu Toggle
            const menuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            menuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });

            // Smooth Scroll & Close Mobile Menu on Link Click
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                    
                    if (!mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                    }
                });
            });

            // --- Populate Angkatan Marquee ---
            const marqueeRow1 = document.querySelector('.marquee.scroll-left');
            const marqueeRow2 = document.querySelector('.marquee.scroll-right');

            const namesRow1 = [
                "Ade Putra", "Bima Sakti", "Citra Lestari", "Dewa Anggara", "Elang Perkasa", "Fajar Nugroho",
                "Gita Permata", "Hari Wijaya", "Indah Cahyani", "Joko Susilo", "Kania Dewi", "Luhut Mahesa",
                "Mega Wati", "Nino Prasetyo", "Oscar Pranata", "Putri Melati", "Qomarudin", "Rian Hidayat",
                "Sinta Septiani", "Tora Wijaksono", "Umar Bakri", "Vino Bastian", "Wulan Guritno", "Xena Wulandari", "Yusuf Kalla"
            ];
            const namesRow2 = [
                "Ahmad Dhani", "Bunga Citra", "Chandra Wijaya", "Diana Puspita", "Eka Kurniawan", "Fani Mulyani",
                "Gatot Subroto", "Hesti Purwadinata", "Irfan Hakim", "Jaya Wijaya", "Kiki Amelia", "Lina Marlina",
                "Mamat Alkatiri", "Nadin Amizah", "Oppie Andaresta", "Pasha Ungu", "Qory Sandioriva", "Rendy Pandugo",
                "Sari Purnamasari", "Tia Afi", "Uut Permatasari", "Vidi Aldiano", "Widi Mulia", "Yoga Pratama", "Zul Zivilia"
            ];

            function createMarqueeItem(name) {
                const item = document.createElement('div');
                item.className = 'marquee-item';
                
                const img = document.createElement('img');
                const nameSlug = name.replace(/\s+/g, '+');
                // Menggunakan placeholder "per orang"
                img.src = `https://placehold.co/300x300/1a2a4a/22d3ee?text=${nameSlug}&font=poppins`;
                img.alt = `Foto ${name}`;
                // Fallback placeholder
                img.onerror = function() {
                    this.src = `https://placehold.co/300x300/1a2a4a/FFFFFF?text=Error&font=poppins`;
                };

                const p = document.createElement('p');
                p.textContent = name;

                item.appendChild(img);
                item.appendChild(p);
                return item;
            }

            function populateMarquee(marqueeElement, names) {
                if (!marqueeElement) return;
                // Menambahkan set asli
                names.forEach(name => {
                    marqueeElement.appendChild(createMarqueeItem(name));
                });
                // Menambahkan set duplikat untuk loop animasi yang mulus
                names.forEach(name => {
                    marqueeElement.appendChild(createMarqueeItem(name));
                });
            }

            populateMarquee(marqueeRow1, namesRow1);
            populateMarquee(marqueeRow2, namesRow2);

            // --- End of Marquee Logic ---


            // Particle Canvas Animation
            const canvas = document.getElementById('particle-canvas');
            if (canvas) {
                const ctx = canvas.getContext('2d');
                let particlesArray;

                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                const mouse = {
                    x: null,
                    y: null,
                    radius: (canvas.height / 100) * (canvas.width / 100)
                };

                window.addEventListener('mousemove', (event) => {
                    mouse.x = event.x;
                    mouse.y = event.y;
                });

                class Particle {
                    constructor(x, y, directionX, directionY, size, color) {
                        this.x = x;
                        this.y = y;
                        this.directionX = directionX;
                        this.directionY = directionY;
                        this.size = size;
                        this.color = color;
                    }

                    draw() {
                        ctx.beginPath();
                        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                        ctx.fillStyle = 'rgba(34, 211, 238, 0.5)';
                        ctx.fill();
                    }

                    update() {
                        if (this.x > canvas.width || this.x < 0) {
                            this.directionX = -this.directionX;
                        }
                        if (this.y > canvas.height || this.y < 0) {
                            this.directionY = -this.directionY;
                        }

                        let dx = mouse.x - this.x;
                        let dy = mouse.y - this.y;
                        let distance = Math.sqrt(dx * dx + dy * dy);
                        if (distance < mouse.radius + this.size) {
                            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                                this.x += 5;
                            }
                            if (mouse.x > this.x && this.x > this.size * 10) {
                                this.x -= 5;
                            }
                            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                                this.y += 5;
                            }
                            if (mouse.y > this.y && this.y > this.size * 10) {
                                this.y -= 5;
                            }
                        }
                        this.x += this.directionX;
                        this.y += this.directionY;
                        this.draw();
                    }
                }

                function init() {
                    particlesArray = [];
                    let numberOfParticles = (canvas.height * canvas.width) / 9000;
                    for (let i = 0; i < numberOfParticles; i++) {
                        let size = (Math.random() * 2) + 1;
                        let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
                        let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
                        let directionX = (Math.random() * 0.4) - 0.2;
                        let directionY = (Math.random() * 0.4) - 0.2;
                        let color = 'rgba(34, 211, 238, 0.5)';
                        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
                    }
                }

                function connect() {
                    let opacityValue = 1;
                    for (let a = 0; a < particlesArray.length; a++) {
                        for (let b = a; b < particlesArray.length; b++) {
                            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                                ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                                opacityValue = 1 - (distance / 20000);
                                ctx.strokeStyle = 'rgba(56, 189, 248, ' + opacityValue + ')';
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                                ctx.stroke();
                            }
                        }
                    }
                }

                function animate() {
                    requestAnimationFrame(animate);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    for (let i = 0; i < particlesArray.length; i++) {
                        particlesArray[i].update();
                    }
                    connect();
                }

                window.addEventListener('resize', () => {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                    mouse.radius = (canvas.height / 100) * (canvas.width / 100);
                    init();
                });

                window.addEventListener('mouseout', () => {
                    mouse.x = undefined;
                    mouse.y = undefined;
                });

                init();
                animate();
            }

            // Intersection Observer for Scroll Animations
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const observerCallback = (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            };

            const observer = new IntersectionObserver(observerCallback, observerOptions);

            const targets = document.querySelectorAll('.scroll-animate');
            targets.forEach(target => {
                observer.observe(target);
            });

        });
            `                                                               ``