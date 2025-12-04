import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { FolderOpen, FileText, Upload, Trash2, Download, File } from 'lucide-react';

const FilesPage = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const saved = storage.getItem('usl_files', []);
        setFiles(saved);
    }, []);

    const handleUpload = (e) => {
        const uploadedFiles = Array.from(e.target.files);

        const newFileEntries = uploadedFiles.map(file => ({
            id: crypto.randomUUID(),
            name: file.name,
            type: file.type,
            size: (file.size / 1024).toFixed(2) + ' KB',
            updatedAt: Date.now()
            // Note: In a real app, we'd upload 'file' to a server/S3 here.
            // For this demo, we are just storing metadata.
        }));

        const updatedList = [...files, ...newFileEntries];
        setFiles(updatedList);
        storage.setItem('usl_files', updatedList);
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this file record?')) {
            const updated = files.filter(f => f.id !== id);
            setFiles(updated);
            storage.setItem('usl_files', updated);
        }
    };

    return (
        <div className="container fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2><FolderOpen className="text-yellow-400 mr-2" /> My Files</h2>
                <label className="btn bg-blue-600 hover:bg-blue-700 cursor-pointer flex items-center gap-2">
                    <Upload size={18} /> Upload Files
                    <input type="file" multiple onChange={handleUpload} className="hidden" />
                </label>
            </div>

            <div className="glass-panel">
                {files.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-gray-400 border-b border-white/10">
                                    <th className="p-4 font-medium">Name</th>
                                    <th className="p-4 font-medium">Type</th>
                                    <th className="p-4 font-medium">Size</th>
                                    <th className="p-4 font-medium">Date</th>
                                    <th className="p-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {files.map(file => (
                                    <tr key={file.id} className="hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                                        <td className="p-4 flex items-center gap-3">
                                            <FileText size={20} className="text-blue-400" />
                                            <span className="font-medium">{file.name}</span>
                                        </td>
                                        <td className="p-4 text-gray-400 text-sm">{file.type || 'Unknown'}</td>
                                        <td className="p-4 text-gray-400 text-sm">{file.size}</td>
                                        <td className="p-4 text-gray-400 text-sm">{new Date(file.updatedAt).toLocaleDateString()}</td>
                                        <td className="p-4 text-right">
                                            <button onClick={() => handleDelete(file.id)} className="text-gray-500 hover:text-red-400 transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-500">
                        <File size={48} className="mx-auto mb-4 opacity-20" />
                        <p>No files uploaded yet.</p>
                        <p className="text-xs mt-2 opacity-60">Metadata only (Demo Mode)</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilesPage;
