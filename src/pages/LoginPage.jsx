import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Settings } from 'lucide-react';
import gsap from 'gsap';

const LoginPage = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const [mode, setMode] = useState('LOGIN'); // LOGIN, OLD, NEW, CONFIRM
    const [tempNewPass, setTempNewPass] = useState('');
    const [message, setMessage] = useState('Enter Passcode');
    const [error, setError] = useState(false);

    const containerRef = useRef(null);
    const dotsRef = useRef(null);

    // Default passcode if none exists
    const getStoredPass = () => localStorage.getItem('usl_auth_passcode') || '2235';

    useEffect(() => {
        // Reset state on mount
        setInput('');
        setMode('LOGIN');
        setMessage('Enter Passcode');

        // Entrance animation
        gsap.fromTo(containerRef.current,
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
        );
    }, []);

    // Handle Input
    const handlePress = (num) => {
        if (input.length < 4) {
            setInput(prev => prev + num);
        }
    };

    const handleDelete = () => {
        setInput(prev => prev.slice(0, -1));
    };

    // Validate Input when length reaches 4
    useEffect(() => {
        if (input.length === 4) {
            validatePasscode();
        }
    }, [input]);

    const validatePasscode = () => {
        const currentPass = getStoredPass();

        if (mode === 'LOGIN') {
            if (input === currentPass) {
                // Success
                localStorage.setItem('usl_is_authenticated', 'true');
                gsap.to(containerRef.current, {
                    scale: 1.1,
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => navigate('/')
                });
            } else {
                triggerError('Wrong Passcode');
            }
        }
        else if (mode === 'OLD') {
            if (input === currentPass) {
                setMode('NEW');
                setMessage('Enter New Passcode');
                setInput('');
            } else {
                triggerError('Incorrect Old Passcode');
            }
        }
        else if (mode === 'NEW') {
            setTempNewPass(input);
            setMode('CONFIRM');
            setMessage('Re-enter New Passcode');
            setInput('');
        }
        else if (mode === 'CONFIRM') {
            if (input === tempNewPass) {
                localStorage.setItem('usl_auth_passcode', input);
                setMode('LOGIN');
                setMessage('Passcode Changed Successfully');
                setInput('');
                // Visual success indicator could go here
                setTimeout(() => setMessage('Enter Passcode'), 2000);
            } else {
                triggerError('Passcodes Do Not Match');
                setMode('NEW'); // Reset to new to try again
                setMessage('Enter New Passcode');
            }
        }
    };

    const triggerError = (msg) => {
        setError(true);
        setMessage(msg);

        // Shake animation
        gsap.fromTo(dotsRef.current,
            { x: -10 },
            {
                x: 10, duration: 0.1, repeat: 5, yoyo: true, onComplete: () => {
                    setInput('');
                    setError(false);
                    // Reset message after delay if it was an error
                    if (mode === 'LOGIN') setTimeout(() => setMessage('Enter Passcode'), 1000);
                }
            }
        );
    };

    const toggleChangeMode = () => {
        if (mode === 'LOGIN') {
            setMode('OLD');
            setMessage('Enter Old Passcode');
            setInput('');
        } else {
            setMode('LOGIN');
            setMessage('Enter Passcode');
            setInput('');
        }
    };

    const keypadMapping = [
        { num: '1', letters: '' },
        { num: '2', letters: 'ABC' },
        { num: '3', letters: 'DEF' },
        { num: '4', letters: 'GHI' },
        { num: '5', letters: 'JKL' },
        { num: '6', letters: 'MNO' },
        { num: '7', letters: 'PQRS' },
        { num: '8', letters: 'TUV' },
        { num: '9', letters: 'WXYZ' },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white font-sans relative overflow-hidden">
            {/* Background Ambience - Deep Blur */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-950 to-slate-950 blur-3xl opacity-50"></div>
            <div className="absolute inset-0 backdrop-blur-[100px]"></div>

            <div ref={containerRef} className="relative z-10 flex flex-col items-center w-full max-w-md pt-10">

                {/* Icon & Message */}
                <div className="mb-12 flex flex-col items-center gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <Lock size={24} className="text-white/80" strokeWidth={2.5} />
                    </div>
                    <h2 className={`text-xl font-normal tracking-wide ${error ? 'text-white' : 'text-white'}`}>
                        {message}
                    </h2>
                </div>

                {/* Dots Indicator - HIGH VISIBILITY */}
                <div ref={dotsRef} className="flex gap-8 mb-20 h-6 items-center">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className={`rounded-full transition-all duration-200 ${i < input.length
                                    ? 'w-4 h-4 bg-white shadow-[0_0_15px_rgba(255,255,255,0.9)]'
                                    : 'w-4 h-4 border-2 border-white/50 bg-transparent'
                                }`}
                        />
                    ))}
                </div>

                {/* Keypad */}
                <div className="grid grid-cols-3 gap-x-8 gap-y-6 w-full max-w-[340px] px-4 place-items-center">
                    {keypadMapping.map(({ num, letters }) => (
                        <button
                            key={num}
                            onClick={() => handlePress(num)}
                            className="w-[80px] h-[80px] rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border-none text-white transition-all active:bg-white/40 flex flex-col items-center justify-center gap-0 shadow-sm"
                        >
                            <span className="text-3xl font-light leading-none mb-0.5">{num}</span>
                            {letters && <span className="text-[9px] font-bold tracking-[2px] leading-none text-white/60">{letters}</span>}
                        </button>
                    ))}

                    {/* Bottom Row */}
                    <div className="flex items-center justify-center w-[80px] h-[80px]">
                        {mode === 'LOGIN' && (
                            <button
                                onClick={toggleChangeMode}
                                className="text-[14px] font-medium text-white/80 hover:text-white transition-colors"
                            >
                                Change<br />Code
                            </button>
                        )}
                        {mode !== 'LOGIN' && (
                            <button
                                onClick={toggleChangeMode}
                                className="text-[14px] font-medium text-white/80 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                        )}
                    </div>

                    <button
                        onClick={() => handlePress('0')}
                        className="w-[80px] h-[80px] rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border-none text-white transition-all active:bg-white/40 flex flex-col items-center justify-center gap-0 shadow-sm"
                    >
                        <span className="text-3xl font-light leading-none mb-0.5">0</span>
                    </button>

                    <div className="flex items-center justify-center w-[80px] h-[80px]">
                        {input.length > 0 && (
                            <button
                                onClick={handleDelete}
                                className="text-[14px] font-medium text-white/80 hover:text-white transition-colors"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;
