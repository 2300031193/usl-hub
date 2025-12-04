import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { Upload, Trash2, Calendar, Image as ImageIcon } from 'lucide-react';

const TimetablePage = () => {
    const [timetable, setTimetable] = useState(null);

    useEffect(() => {
        const saved = storage.getItem('usl_timetable', null);
        setTimetable(saved);
    }, []);

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            alert('File too large. Please upload an image under 5MB.');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const newData = {
                image: reader.result,
                updatedAt: Date.now()
            };
            setTimetable(newData);
            storage.setItem('usl_timetable', newData);
        };
        reader.readAsDataURL(file);
    };

    const handleDelete = () => {
        if (window.confirm('Remove current timetable?')) {
            setTimetable(null);
            storage.removeItem('usl_timetable');
        }
    };

    return (
        <div className="container fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2><Calendar className="text-green-400 mr-2" /> My Timetable</h2>
                {timetable && (
                    <button onClick={handleDelete} className="btn bg-red-600/20 text-red-400 hover:bg-red-600/40 flex items-center gap-2">
                        <Trash2 size={18} /> Remove
                    </button>
                )}
            </div>

            <div className="glass-panel min-h-[60vh] flex flex-col items-center justify-center p-8 relative">
                {timetable ? (
                    <div className="w-full h-full flex flex-col items-center">
                        <img
                            src={timetable.image}
                            alt="Timetable"
                            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                        />
                        <p className="text-gray-500 text-sm mt-4">
                            Last updated: {new Date(timetable.updatedAt).toLocaleDateString()}
                        </p>
                    </div>
                ) : (
                    <div className="text-center">
                        <div className="bg-white/5 p-6 rounded-full inline-block mb-4">
                            <ImageIcon size={48} className="text-gray-400" />
                        </div>
                        <h3 className="text-xl mb-2">No Timetable Uploaded</h3>
                        <p className="text-gray-400 mb-6">Upload an image of your schedule to keep it handy.</p>

                        <label className="btn bg-blue-600 hover:bg-blue-700 cursor-pointer inline-flex items-center gap-2">
                            <Upload size={18} /> Upload Image
                            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                        </label>
                        <p className="text-xs text-gray-500 mt-2">Max 5MB. Stored locally.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TimetablePage;
