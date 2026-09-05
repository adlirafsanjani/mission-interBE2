import React from 'react';

export default function CourseCard({ title, description, image, avatar, instructor, role, rating, reviews, price }) {
    const numericRating = parseFloat(rating) || 0;
    const fullStars = Math.floor(numericRating);
    const emptyStars = 5 - Math.ceil(numericRating);

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full">
            {/* Gambar Cover */}
            <img src={image} alt={title} className="w-full h-44 object-cover" />

            <div className="p-5 flex flex-col flex-grow">
                {/* Judul & Deskripsi */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{title}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {description || "Deskripsi kelas belum tersedia. Mulai transformasi dengan instruktur profesional."}
                </p>

                {/* Profil Instruktur */}
                <div className="flex items-center gap-3 mb-6 mt-auto">
                    <img
                        src={avatar ? avatar : `https://i.pravatar.cc/150?u=${instructor}`}
                        alt={instructor}
                        className="w-10 h-10 rounded-lg object-cover bg-purple-100"
                    />
                    <div>
                        <p className="text-sm font-bold text-gray-900">{instructor}</p>
                        <p className="text-xs text-gray-500">{role || "Instruktur"}</p>
                    </div>
                </div>

                {/* Footer Kartu: Rating & Harga */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                        <div className="flex text-yellow-400 text-sm">
                            {"★".repeat(fullStars)}
                            {numericRating % 1 !== 0 && "★"}
                            <span className="text-gray-300">{"★".repeat(emptyStars > 0 ? emptyStars : 0)}</span>
                        </div>
                        <span className="text-xs font-medium text-gray-500 underline ml-1">
                            {rating || "0.0"} ({reviews || "0"})
                        </span>
                    </div>
                    <div className="text-lg font-bold text-[#3CC953]">
                        {price === "Rp 0" ? "Gratis" : price}
                    </div>
                </div>
            </div>
        </div>
    );
}