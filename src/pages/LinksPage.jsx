import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { Plus, Trash2, ExternalLink, Edit2, Globe, Save, X } from 'lucide-react';

const LinksPage = () => {
    const [links, setLinks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // Form State
    const [formData, setFormData] = useState({ title: '', url: '', tags: '', notes: '' });

    useEffect(() => {
        const savedLinks = storage.getItem('usl_links', []);
        setLinks(savedLinks);
    }, []);

    const saveLinks = (newLinks) => {
        setLinks(newLinks);
        storage.setItem('usl_links', newLinks);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newLink = {
            id: editingId || crypto.randomUUID(),
            ...formData,
            tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
            createdAt: Date.now()
        };

        if (editingId) {
            saveLinks(links.map(l => l.id === editingId ? newLink : l));
        } else {
            saveLinks([...links, newLink]);
        }

        closeModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this link?')) {
            saveLinks(links.filter(l => l.id !== id));
        }
    };

    const openEdit = (link) => {
        setFormData({
            title: link.title,
            url: link.url,
            tags: link.tags.join(', '),
            notes: link.notes || ''
        });
        setEditingId(link.id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ title: '', url: '', tags: '', notes: '' });
    };

    return (
        <div className="container fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2><Globe className="text-blue-400 mr-2" /> My Links</h2>
                <button onClick={() => setIsModalOpen(true)} className="btn bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                    <Plus size={18} /> Add Link
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {links.map(link => (
                    <div key={link.id} className="glass-panel relative group">
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => openEdit(link)} className="p-1 hover:text-blue-400"><Edit2 size={16} /></button>
                            <button onClick={() => handleDelete(link.id)} className="p-1 hover:text-red-400"><Trash2 size={16} /></button>
                        </div>

                        <h3 className="text-xl font-semibold mb-1">{link.title}</h3>
                        <a href={link.url} target="_blank" rel="noreferrer" className="text-blue-400 text-sm hover:underline flex items-center gap-1 mb-3 truncate">
                            {link.url} <ExternalLink size={12} />
                        </a>

                        {link.notes && <p className="text-gray-400 text-sm mb-3">{link.notes}</p>}

                        <div className="flex flex-wrap gap-2">
                            {link.tags.map((tag, i) => (
                                <span key={i} className="text-xs bg-white/10 px-2 py-1 rounded-full text-gray-300">#{tag}</span>
                            ))}
                        </div>
                    </div>
                ))}

                {links.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        No links saved yet. Click "Add Link" to start.
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="glass-panel w-full max-w-md p-6 relative bg-[#0f172a]">
                        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={20} /></button>
                        <h3 className="text-xl mb-4">{editingId ? 'Edit Link' : 'New Link'}</h3>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Title</label>
                                <input
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded p-2 text-white focus:border-blue-500 outline-none"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="e.g. React Documentation"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">URL</label>
                                <input
                                    required
                                    type="url"
                                    className="w-full bg-white/5 border border-white/10 rounded p-2 text-white focus:border-blue-500 outline-none"
                                    value={formData.url}
                                    onChange={e => setFormData({ ...formData, url: e.target.value })}
                                    placeholder="https://..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Tags (comma separated)</label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded p-2 text-white focus:border-blue-500 outline-none"
                                    value={formData.tags}
                                    onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                    placeholder="study, dev, reference"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Notes</label>
                                <textarea
                                    className="w-full bg-white/5 border border-white/10 rounded p-2 text-white focus:border-blue-500 outline-none h-24"
                                    value={formData.notes}
                                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                    placeholder="Optional description..."
                                />
                            </div>

                            <button type="submit" className="btn bg-blue-600 hover:bg-blue-700 mt-2 flex justify-center items-center gap-2">
                                <Save size={18} /> Save Link
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LinksPage;
