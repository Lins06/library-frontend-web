import React from 'react';
import { Edit3, Trash2 } from 'lucide-react';

const BookCard = ({ book, onEdit, onDelete }) => {
  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group hover:bg-white">
      {/* Cover */}
      <div className="h-52 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-2xl mb-6 overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
        <div className="h-full w-full bg-gradient-to-br from-indigo-500/5 to-purple-500/5 flex items-center justify-center p-8">
          <svg className="w-24 h-32 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <h3 className="font-black text-2xl text-gray-900 mb-4 leading-tight line-clamp-2 group-hover:text-indigo-600 transition-colors">
        {book.title}
      </h3>
      <p className="text-xl font-bold text-gray-700 mb-6 line-clamp-1">{book.author}</p>

      {/* Tags */}
      <div className="flex items-center gap-4 mb-8">
        <span className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 font-bold rounded-full text-sm shadow-md">
          {book.genre}
        </span>
        <span className="text-lg text-gray-500 font-semibold">{book.publicationYear}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-6 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <button
          onClick={onEdit}
          className="flex-1 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Edit3 className="w-5 h-5" />
          Editar
        </button>
        <button
          onClick={onDelete}
          className="w-14 h-14 bg-white border-2 border-red-200 hover:border-red-400 text-red-500 hover:text-red-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default BookCard;