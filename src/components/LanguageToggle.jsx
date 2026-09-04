import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check, ChevronDown, Search, X } from 'lucide-react';
import { ALL_LANGUAGES } from '../i18n';

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currentLangCode = i18n.language || 'en';
  const currentLang = ALL_LANGUAGES.find(l => l.code === currentLangCode) || ALL_LANGUAGES[0];

  const filteredLanguages = ALL_LANGUAGES.filter(lang =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.native.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLanguageChange = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('sahakar_language', code);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="relative inline-block text-left">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#FAF5EE] hover:bg-[#F0EAE1] text-[#2B2B2B] border border-[#E8DFD8] transition-all shadow-2xs cursor-pointer"
        title="Select Language (22 Indian Languages)"
      >
        <Globe className="w-3.5 h-3.5 text-[#C45C3C]" />
        <span className="font-bold">{currentLang.native}</span>
        <span className="text-[10px] text-[#8C827A] hidden sm:inline">({currentLang.name})</span>
        <ChevronDown className={`w-3 h-3 text-[#8C827A] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Searchable Language Modal / Popover */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs lg:absolute lg:inset-auto lg:right-0 lg:mt-2 lg:w-96 lg:bg-transparent lg:p-0"
        >
          <div
            className="w-full max-w-md lg:max-w-none bg-white rounded-3xl lg:rounded-2xl shadow-2xl border border-[#E8DFD8] overflow-hidden flex flex-col max-h-[85vh] lg:max-h-[500px]"
          >
            {/* Header */}
            <div className="p-4 border-b border-[#F0EAE1] bg-[#FAF5EE] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#C45C3C]" />
                <h3 className="font-bold text-xs text-[#2B2B2B] uppercase tracking-wider">
                  22 Official Languages of India
                </h3>
              </div>
              <button
                onClick={() => { setIsOpen(false); setSearchQuery(''); }}
                className="p-1 rounded-lg text-[#736B63] hover:bg-gray-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-3 border-b border-[#F0EAE1]">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#8C827A] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search language or state (e.g. বাংলা, Tamil, Marathi)..."
                  className="w-full pl-9 pr-3 py-1.5 bg-[#FAF5EE] border border-[#E8DFD8] rounded-xl text-xs font-semibold text-[#2B2B2B] focus:outline-none focus:border-[#2D6A4F]"
                  autoFocus
                />
              </div>
            </div>

            {/* Language List */}
            <div className="overflow-y-auto p-2 space-y-1 divide-y divide-[#FAF5EE]">
              {filteredLanguages.map((lang) => {
                const isSelected = lang.code === currentLangCode;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full px-3 py-2.5 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#D1FAE5] text-[#1B4332] font-black'
                        : 'hover:bg-[#FAF5EE] text-[#2B2B2B]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-sm font-bold">{lang.native}</strong>
                        <span className="text-xs text-[#736B63]">({lang.name})</span>
                      </div>
                      <span className="text-[10px] text-[#8C827A] block">{lang.region}</span>
                    </div>

                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center text-xs">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </button>
                );
              })}

              {filteredLanguages.length === 0 && (
                <div className="p-4 text-center text-xs text-[#8C827A]">
                  No language found matching "{searchQuery}"
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-2.5 bg-[#FAF5EE] border-t border-[#F0EAE1] text-center text-[10px] text-[#8C827A]">
              Recognized under 8th Schedule of the Constitution of India
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
