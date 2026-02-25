"use client";

import React from "react";
import {
    Package,
    Type,
    DollarSign,
    FileText,
    Tag,
    Image as ImageIcon,
    Save,
    Plus,
    X,
    Cpu,
    Check
} from "lucide-react";

interface ProductFormProps {
    action: (prevState: any, formData: FormData) => Promise<any>;
    submitLabel?: string;
    initialData?: any;
}

const CATEGORIES = [
    { id: "web_projects", name: "Web Projects" },
    { id: "saas", name: "SaaS Templates" },
    { id: "ai_agents", name: "AI Agents" },
    { id: "workflows", name: "Workflows" },
    { id: "excel_dashboards", name: "Excel Dashboards" },
    { id: "powerbi_dashboards", name: "PowerBI Dashboards" },
    { id: "data_viz", name: "Tableau / Looker / Dashboards" },
    { id: "ideas_templates", name: "Ideas & Templates" },
    { id: "ui_ux", name: "UI/UX Kits" },
    { id: "management_systems", name: "Management Systems" },
];

export default function ProductForm({ action, submitLabel = "Execute Deployment", initialData }: ProductFormProps) {
    const [state, formAction, isPending] = React.useActionState(action, { error: null });
    const [techStack, setTechStack] = React.useState<string[]>(initialData?.techStack || []);
    const [features, setFeatures] = React.useState<string[]>(initialData?.features || []);
    const [imageUrls, setImageUrls] = React.useState<string[]>(initialData?.images?.map((img: any) => img.url) || [""]);
    const [productFiles, setProductFiles] = React.useState<Array<{ filename: string; url: string }>>(
        initialData?.productFiles || [{ filename: "", url: "" }]
    );

    const addImage = () => setImageUrls([...imageUrls, ""]);
    const removeImage = (index: number) => {
        if (imageUrls.length > 1) {
            setImageUrls(imageUrls.filter((_, i) => i !== index));
        } else {
            setImageUrls([""]);
        }
    };
    const updateImage = (index: number, value: string) => {
        const newImages = [...imageUrls];
        newImages[index] = value;
        setImageUrls(newImages);
    };

    const addFile = () => setProductFiles([...productFiles, { filename: "", url: "" }]);
    const removeFile = (index: number) => {
        if (productFiles.length > 1) {
            setProductFiles(productFiles.filter((_, i) => i !== index));
        } else {
            setProductFiles([{ filename: "", url: "" }]);
        }
    };
    const updateFile = (index: number, field: "filename" | "url", value: string) => {
        const newFiles = [...productFiles];
        newFiles[index][field] = value;
        setProductFiles(newFiles);
    };

    const addTech = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const val = e.currentTarget.value.trim();
            if (val && !techStack.includes(val)) {
                setTechStack([...techStack, val]);
                e.currentTarget.value = '';
            }
        }
    };

    const addFeature = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const val = e.currentTarget.value.trim();
            if (val && !features.includes(val)) {
                setFeatures([...features, val]);
                e.currentTarget.value = '';
            }
        }
    };

    const handleSubmit = (formData: FormData) => {
        techStack.forEach(t => formData.append('techStack', t));
        features.forEach(f => formData.append('features', f));
        imageUrls.filter(url => url.trim() !== "").forEach(url => formData.append('imageUrl', url));
        productFiles.filter(f => f.url.trim() !== "").forEach(f => {
            formData.append('fileUrl', f.url);
            formData.append('fileName', f.filename || "Digital_Asset");
        });

        if (initialData?.id && !formData.has("id")) {
            formData.append("id", initialData.id);
        }

        formAction(formData);
    };

    return (
        <form
            action={handleSubmit}
            className="space-y-12"
        >
            {state?.error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center animate-shake">
                    {state.error}
                </div>
            )}

            {/* Core Metadata */}
            <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 space-y-10">
                <div className="flex items-center gap-4 mb-2">
                    <Package size={16} className="text-white/20" />
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Core Metadata</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-1">Asset Nomenclature</label>
                        <div className="relative group">
                            <Type className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-white transition-colors" size={16} />
                            <input
                                type="text"
                                name="name"
                                defaultValue={initialData?.name}
                                required
                                placeholder="E.G. NEURAL_CORE_V1"
                                className="w-full pl-16 pr-6 py-4 bg-white/[0.02] border border-white/5 rounded-2xl text-white placeholder:text-white/10 focus:outline-none focus:border-white/20 transition-all font-bold tracking-tight uppercase"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-1">Valuation (USD)</label>
                        <div className="relative group">
                            <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-white transition-colors" size={16} />
                            <input
                                type="number"
                                name="price"
                                defaultValue={initialData?.price}
                                required
                                min="0"
                                step="1"
                                placeholder="0"
                                className="w-full pl-16 pr-6 py-4 bg-white/[0.02] border border-white/5 rounded-2xl text-white placeholder:text-white/10 focus:outline-none focus:border-white/20 transition-all font-mono font-bold"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-1">Architectural Classification</label>
                    <div className="relative group">
                        <Tag className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-white transition-colors" size={16} />
                        <select
                            name="category"
                            defaultValue={initialData?.category || "saas"}
                            className="w-full pl-16 pr-6 py-4 bg-white/[0.02] border border-white/5 rounded-2xl text-white focus:outline-none focus:border-white/20 transition-all font-bold appearance-none uppercase tracking-widest"
                        >
                            {CATEGORIES.map(cat => (
                                <option key={cat.id} value={cat.id} className="bg-zinc-900">{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-1">Asset Intelligence Overview</label>
                    <div className="relative group">
                        <FileText className="absolute left-6 top-8 text-white/10 group-focus-within:text-white transition-colors" size={16} />
                        <textarea
                            name="description"
                            defaultValue={initialData?.description}
                            required
                            rows={4}
                            placeholder="Identify the core primitives and intended utility..."
                            className="w-full pl-16 pr-6 py-6 bg-white/[0.02] border border-white/5 rounded-[2rem] text-white placeholder:text-white/10 focus:outline-none focus:border-white/20 transition-all leading-relaxed italic"
                        />
                    </div>
                </div>
            </div>

            {/* Technical Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Tech Stack */}
                <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10">
                    <div className="flex items-center gap-4 mb-8">
                        <Cpu size={16} className="text-white/20" />
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Tech Stack Protocol</h3>
                    </div>
                    <div className="space-y-6">
                        <input
                            type="text"
                            placeholder="Add tech (ENTER)"
                            onKeyDown={addTech}
                            className="w-full px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-white/30"
                        />
                        <div className="flex flex-wrap gap-2">
                            {techStack.map(t => (
                                <span key={t} className="px-3 py-1.5 bg-white text-black text-[9px] font-black uppercase tracking-widest rounded-lg flex items-center gap-2">
                                    {t}
                                    <button type="button" onClick={() => setTechStack(techStack.filter(x => x !== t))}><X size={10} /></button>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10">
                    <div className="flex items-center gap-4 mb-8">
                        <Check size={16} className="text-white/20" />
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Core Primitives</h3>
                    </div>
                    <div className="space-y-6">
                        <input
                            type="text"
                            placeholder="Add feature (ENTER)"
                            onKeyDown={addFeature}
                            className="w-full px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-white/30"
                        />
                        <div className="flex flex-wrap gap-2">
                            {features.map(f => (
                                <span key={f} className="px-3 py-1.5 bg-white/5 border border-white/10 text-white text-[9px] font-bold uppercase tracking-widest rounded-lg flex items-center gap-2">
                                    {f}
                                    <button type="button" onClick={() => setFeatures(features.filter(x => x !== f))}><X size={10} /></button>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <ImageIcon size={16} className="text-white/20" />
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Visual Artifacts</h3>
                    </div>
                    <button
                        type="button"
                        onClick={addImage}
                        className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all"
                    >
                        <Plus size={12} />
                        Add Node
                    </button>
                </div>
                <div className="space-y-4">
                    {imageUrls.map((url, index) => (
                        <div key={index} className="flex gap-3">
                            <div className="flex-1 relative group">
                                <input
                                    type="url"
                                    value={url}
                                    onChange={(e) => updateImage(index, e.target.value)}
                                    placeholder="IMAGE_URL (DIRECT LINK)"
                                    className="w-full px-6 py-4 bg-white/[0.02] border border-white/5 rounded-2xl text-[10px] font-mono text-white/40 focus:text-white transition-all uppercase"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="p-4 bg-red-500/5 hover:bg-red-500/10 text-red-400 rounded-2xl border border-red-500/10 transition-all"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                    <p className="text-[8px] text-white/10 uppercase tracking-widest ml-2 italic">Recommendation: 1200x800 industrial aspect ratio. First image is the primary thumbnail.</p>
                </div>
            </div>

            {/* Asset Deliverables */}
            <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Save size={16} className="text-white/20" />
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Asset Deliverables (Digital Files)</h3>
                    </div>
                    <button
                        type="button"
                        onClick={addFile}
                        className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all"
                    >
                        <Plus size={12} />
                        Add Package
                    </button>
                </div>
                <div className="space-y-6">
                    {productFiles.map((file, index) => (
                        <div key={index} className="p-6 bg-black/20 border border-white/5 rounded-3xl space-y-4 relative group">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[8px] font-black text-white/20 uppercase tracking-widest ml-1">Package Name</label>
                                    <input
                                        type="text"
                                        value={file.filename}
                                        onChange={(e) => updateFile(index, "filename", e.target.value)}
                                        placeholder="E.G. CORE_REPOSITORY_V1"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-white uppercase tracking-wider focus:outline-none focus:border-white/20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[8px] font-black text-white/20 uppercase tracking-widest ml-1">Secure Download URL</label>
                                    <input
                                        type="url"
                                        value={file.url}
                                        onChange={(e) => updateFile(index, "url", e.target.value)}
                                        placeholder="HTTPS://GITHUB.COM/MSA/REPOSITORY"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-mono text-white/40 focus:text-white transition-all uppercase"
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="absolute -top-3 -right-3 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-xl hover:scale-110"
                            >
                                <X size={12} />
                            </button>
                        </div>
                    ))}
                    <p className="text-[8px] text-white/10 uppercase tracking-widest ml-2 italic">Secure downloads are only exposed to verified purchasers post-settlement.</p>
                </div>
            </div>

            {/* Deployment Action */}
            <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4 text-white/20">
                    <Check size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Integrity Check Active</span>
                </div>
                <button
                    type="submit"
                    disabled={isPending}
                    className="px-12 py-6 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] hover:bg-white/90 transition-all shadow-2xl active:scale-95 disabled:opacity-50 flex items-center gap-4"
                >
                    {isPending ? "INITIALIZING DEPLOYMENT..." : submitLabel}
                    <Plus size={14} />
                </button>
            </div>
        </form>
    );
}
