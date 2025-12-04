import React, { useEffect, useRef } from 'react';
import { Sun, Sparkles } from 'lucide-react';
import gsap from 'gsap';

const HanumanPage = () => {
    const containerRef = useRef(null);
    const flowersRef = useRef(null);
    // Static image path since upload option is removed
    const userImage = '/assets/hanuman.png';

    useEffect(() => {
        // Flower/Leaf Rain Animation
        const flowerCount = 50;
        const colors = ['#FF8C00', '#FFA500', '#FF4500', '#FFD700'];

        if (flowersRef.current) {
            flowersRef.current.innerHTML = '';
        }

        for (let i = 0; i < flowerCount; i++) {
            const flower = document.createElement('div');
            flower.classList.add('flower-petal');

            const size = Math.random() * 12 + 8;
            const color = colors[Math.floor(Math.random() * colors.length)];

            Object.assign(flower.style, {
                position: 'absolute',
                top: '-50px',
                left: `${Math.random() * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
                borderRadius: '50% 0 50% 0',
                opacity: Math.random() * 0.8 + 0.4,
                zIndex: 50,
                pointerEvents: 'none',
                boxShadow: `0 0 5px ${color}`
            });

            flowersRef.current.appendChild(flower);

            gsap.to(flower, {
                y: '120vh',
                x: `+=${Math.random() * 150 - 75}`,
                rotation: Math.random() * 720,
                duration: Math.random() * 6 + 6,
                repeat: -1,
                ease: 'none',
                delay: Math.random() * 10
            });
        }

        const ctx = gsap.context(() => {
            gsap.from(".chalisa-line", {
                opacity: 0,
                y: 20,
                stagger: 0.1,
                duration: 1,
                ease: "power2.out"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const orangeStyle = { color: '#FF6F00' };
    const brightOrangeStyle = { color: '#FF8C00' };

    return (
        <div className="container fade-in pb-20 relative min-h-screen flex flex-col items-center" ref={containerRef}>
            <div ref={flowersRef} className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 50 }}></div>

            {/* Header */}
            <div className="text-center mb-6 relative z-10 mt-8 w-full">
                <h2 className="text-5xl font-bold mb-4 flex justify-center items-center gap-4 font-serif" style={orangeStyle}>
                    <Sun size={48} className="animate-spin-slow" style={{ color: '#FFD700' }} />
                    <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        Jai Bajrangbali
                    </span>
                    <Sun size={48} className="animate-spin-slow" style={{ color: '#FFD700' }} />
                </h2>
            </div>

            {/* Main Content */}
            <div className="w-full max-w-2xl relative z-10 flex flex-col items-center gap-8">

                {/* Image Section - Static & Small */}
                <div className="relative group w-48 mx-auto flex justify-center">
                    {/* Glow Effect behind the image */}
                    <div className="absolute inset-0 bg-orange-500/30 blur-2xl rounded-full animate-pulse z-0"></div>

                    <div className="relative z-10 w-full flex flex-col items-center">
                        <img
                            src={userImage}
                            alt="Lord Hanuman"
                            className="w-full h-auto object-contain drop-shadow-[0_0_15px_rgba(255,140,0,0.6)] hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>

                {/* The Chalisa Text */}
                <div className="glass-panel w-full border-orange-500/20 bg-[#0f172a]/80 backdrop-blur-xl">
                    <div className="sticky top-0 bg-[#0f172a]/95 backdrop-blur-md p-4 border-b border-orange-500/20 z-10 flex justify-center items-center shadow-lg rounded-t-2xl">
                        <h3 className="text-3xl font-bold flex items-center gap-3 font-serif tracking-wide" style={orangeStyle}>
                            <Sparkles size={24} style={{ color: '#FFD700' }} /> Hanuman Chalisa <Sparkles size={24} style={{ color: '#FFD700' }} />
                        </h3>
                    </div>

                    <div className="p-8 space-y-8 text-center flex flex-col items-center">

                        {/* Initial Doha */}
                        <div className="bg-orange-500/5 p-8 rounded-2xl border border-orange-500/20 shadow-inner chalisa-line w-full">
                            <p className="font-bold mb-6 text-2xl font-serif uppercase tracking-widest" style={orangeStyle}>|| Doha ||</p>
                            <p className="text-2xl mb-4 font-semibold leading-relaxed" style={brightOrangeStyle}>
                                Shri Guru Charan Saroj Raj, Nij Manu Mukuru Sudhari |
                            </p>
                            <p className="text-2xl mb-4 font-semibold leading-relaxed" style={brightOrangeStyle}>
                                Barnau Raghubar Bimal Jasu, Jo Dayaku Phal Chari ||
                            </p>

                            <div className="w-24 h-[2px] bg-orange-500/50 mx-auto my-8"></div>

                            <p className="text-2xl mb-4 font-semibold leading-relaxed" style={brightOrangeStyle}>
                                Buddhiheen Tanu Janike, Sumirow Pavan Kumar |
                            </p>
                            <p className="text-2xl font-semibold leading-relaxed" style={brightOrangeStyle}>
                                Bal Buddhi Vidya Dehu Mohi, Harahu Kalesh Vikar ||
                            </p>
                        </div>

                        {/* Chaupais */}
                        <div className="space-y-6 w-full">
                            {[
                                "Jai Hanuman gyan gun sagar |Jai Kapis tihun lok ujagar 1",
                                "Ram doot atulit bal dhama |Anjani-putra Pavan sut nama 2",
                                "Mahabir Bikram Bajrangi |Kumati nivar sumati Ke sangi 3",
                                "Kanchan baran biraj subesa |Kanan Kundal Kunchit Kesa 4",
                                "Hath Bajra Aur Dhvaja Biraje |Kandhe Moonj Janeu saje 5",
                                "Shankar suvan Kesari Nandan |Tej pratap maha jag vandan 6",
                                "Vidhyavan guni ati chatur |Ram kaj karibe ko aatur 7",
                                "Prabhu charitra sunibe ko rasiya |Ram Lakhan Sita man Basiya 8",
                                "Sukshma roop dhari Siyahi dikhava |Bikat roop dhari Lank jarava 9",
                                "Bhima roop dhari asur sanghare |Ramachandra ke kaj savare 10",
                                "Laye Sanjivan Lakhan Jiyaye |Shri Raghubir Harashi ur laye 11",
                                "Raghupati Kinhi bahut badai |Tum mam priye Bharat-hi sam bhai 12",
                                "Sahas badan tumharo yash gave |As kahi Shripati kanth lagave 13",
                                "Sanadik Brahmadi Muneesa |Narad Sarad Sahit Aheesa 14",
                                "Yam Kuber Digpal Jahan te |Kavi kovid kahi sake kahan te 15",
                                "Tum upkar Sugreevahin keenha |Ram milaye rajpad deenha 16",
                                "Tumharo mantra Vibheeshan mana |Lankeshwar Bhaye Sab Jag Jana 17",
                                "Yug sahasra yojan par Bhanu |Leelyo tahi madhur phal janu 18",
                                "Prabhu mudrika meli mukh mahee |Jaladhi langhi gaye achraj nahee 19",
                                "Durgam kaj jagat ke jete |Sugam anugraha tumhare tete 20",
                                "Ram dware tum rakhvare |Hot na agya binu paisare 21",
                                "Sub sukh lahai tumhari sarna |Tum rakshak kahu ko darna 22",
                                "Aapan tej samharo aapai |Teenon lok hank te kanpai 23",
                                "Bhoot pishach Nikat nahi aavai |Mahavir jab naam sunavai 24",
                                "Nase rog harai sab peera |Japat nirantar Hanumat Beera 25",
                                "Sankat te Hanuman chhudavai |Man Kram Vachan dhyan jo lavai 26",
                                "Sab par Ram tapasvi raja |Tin ke kaj sakal Tum saja 27",
                                "Aur manorath jo koi lavai |Soi amit jeevan phal pavai 28",
                                "Charon Yug partap tumhara |Hai persidh jagat ujiyara 29",
                                "Sadhu Sant ke tum Rakhware |Asur nikandan Ram dulare 30",
                                "Ashta siddhi nav nidhi ke data |As var deen Janki mata 31",
                                "Ram rasayan tumhare pasa |Sada raho Raghupati ke dasa 32",
                                "Tumhare bhajan Ram ko pavai |Janam janam ke dukh bisravai 33",
                                "Antkaal Raghuvar pur jayee |Jahan janam Hari-Bhakt Kahayee 34",
                                "Aur Devta Chitt na dharayi |Hanumat sei sarva sukh karayi 35",
                                "Sankat kate mite sab peera |Jo sumirai Hanumat Balbeera 36",
                                "Jai Jai Jai Hanuman Gosaee |Kripa Karahu Gurudev ki naee 37",
                                "Jo sat bar path kare koi |Chhutahi bandi maha sukh hoi 38",
                                "Jo yah padhe Hanuman Chalisa |Hoye siddhi sakhi Gaureesa 39",
                                "Tulsidas sada hari chera |Keejai Nath Hridaye mein dera 40"
                            ].map((line, index) => (
                                <div key={index} className="chalisa-line hover:scale-105 transition-transform duration-300 py-3 border-b border-orange-500/10 last:border-0 w-full flex flex-col items-center">
                                    <p className="text-2xl font-serif leading-loose font-bold tracking-wide text-center" style={{ ...brightOrangeStyle, textShadow: '0 0 15px rgba(255, 140, 0, 0.3)' }}>
                                        {line}
                                    </p>
                                </div>
                            ))}

                            {/* Ending Doha */}
                            <div className="bg-orange-500/10 p-8 rounded-2xl border border-orange-500/20 mt-12 shadow-inner chalisa-line w-full">
                                <p className="font-bold mb-6 text-2xl font-serif uppercase tracking-widest" style={orangeStyle}>|| Doha ||</p>
                                <p className="text-2xl mb-4 font-semibold leading-relaxed" style={brightOrangeStyle}>Pavan Tanay Sankat Harana, Mangala Murati Roop |</p>
                                <p className="text-2xl font-semibold leading-relaxed" style={brightOrangeStyle}>Ram Lakhan Sita Sahita, Hriday Basahu Sur Bhoop ||</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HanumanPage;
