'use client';

import Link from 'next/link';
import { useState, useId } from 'react';
import PlusIcon from './plusIcon';
import HtmlHighlighter from './HtmlHighlighter';
import CopyIcon from './copyIcon';
import CheckIcon from './checkIcon';

export default function Form() {
  // Використовуємо useId для початкового id, щоб уникнути hydration mismatch
  const baseId = useId();

  // Структура елемента: { id, rawLink, directLink, mimeType, error }
  const [links, setLinks] = useState([
    {
      id: baseId,
      rawLink: '',
      directLink: '',
      mimeType: '',
      error: '',
    },
  ]);

  // Перетворюємо Dropbox “share” URL у прямий URL
  const transformDropboxLink = (rawUrl) => {
    try {
      const urlObj = new URL(rawUrl);
      if (/dropbox\.com$/.test(urlObj.hostname)) {
        urlObj.hostname = 'dl.dropboxusercontent.com';
        return urlObj.toString();
      }
      return rawUrl;
    } catch {
      return rawUrl;
    }
  };

  // Визначаємо MIME-тип за розширенням (лише відео)
  const detectMimeType = (url) => {
    const path = url.split('?')[0];
    const extMatch = path.match(/\.([a-zA-Z0-9]+)$/);
    if (!extMatch) return '';
    const ext = extMatch[1].toLowerCase();
    switch (ext) {
      case 'webm':
        return 'video/webm';
      case 'mp4':
        return 'video/mp4';
      case 'ogg':
      case 'ogv':
        return 'video/ogg';
      case 'mov':
        return 'video/quicktime';
      default:
        return '';
    }
  };

  // Чи є розширення відеоформатом
  const isVideoExtension = (url) => {
    const path = url.split('?')[0];
    const extMatch = path.match(/\.([a-zA-Z0-9]+)$/);
    if (!extMatch) return false;
    const ext = extMatch[1].toLowerCase();
    return ['webm', 'mp4', 'ogg', 'ogv', 'mov'].includes(ext);
  };

  // Обробляємо зміну інпуту
  const handleLinkChange = (id, newRaw) => {
    setLinks((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const trimmed = newRaw.trim();
        let errorMsg = '';
        let direct = '';
        let mime = '';

        try {
          const urlObj = new URL(trimmed);
          const hostname = urlObj.hostname.toLowerCase();

          // Перевіряємо, чи це Dropbox URL
          if (!hostname.endsWith('dropbox.com')) {
            errorMsg = 'Link must be a Dropbox URL.';
          } else {
            // Трансформуємо домен
            direct = transformDropboxLink(trimmed);

            // Перевіряємо, чи це відео
            if (!isVideoExtension(direct)) {
              errorMsg =
                'Dropbox URL must point to a video file (mp4, webm, ogg, ogv, mov).';
              direct = '';
            } else {
              mime = detectMimeType(direct);
              if (!mime) {
                errorMsg = 'Cannot determine video MIME type.';
                direct = '';
              }
            }

            // Перевірка на дублікат формату
            if (!errorMsg && mime) {
              const duplicate = prev.find(
                (other) =>
                  other.id !== id &&
                  other.mimeType === mime &&
                  other.directLink,
              );
              if (duplicate) {
                errorMsg = `You already have a video in "${
                  mime.split('/')[1]
                }" format.`;
                direct = '';
                mime = '';
              }
            }
          }
        } catch {
          errorMsg = 'Invalid URL format.';
        }

        return {
          ...item,
          rawLink: newRaw,
          directLink: direct,
          mimeType: mime,
          error: errorMsg,
        };
      }),
    );
  };

  // Додаємо нове порожнє поле (додається тільки на клієнті, тож id проблем не викличе)
  const addNewLinkField = () => {
    setLinks((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        rawLink: '',
        directLink: '',
        mimeType: '',
        error: '',
      },
    ]);
  };

  // Видаляємо поле за id
  const removeLinkField = (id) => {
    setLinks((prev) => prev.filter((item) => item.id !== id));
  };

  // Генеруємо HTML з усіма валідними <source>
  const generateVideoHTML = () => {
    const sources = links.filter((i) => i.directLink && !i.error);
    if (sources.length === 0) return '';

    let html = `<video width="100%" height="100%" poster="{%your_poster%}" autoplay loop muted playsinline>\n`;
    sources.forEach((item) => {
      html += `  <source src="${item.directLink}" type="${item.mimeType}" />\n`;
    });
    html += `  Your browser does not support the video tag.\n</video>`;
    return html;
  };

  const videoHTMLString = generateVideoHTML();

  // Стан для відображення повідомлення про копіювання
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Копіюємо рядок videoHTMLString у буфер
    navigator.clipboard.writeText(videoHTMLString).then(() => {
      setCopied(true);
      // Повертаємо стан назад через 2 секунди
      setTimeout(() => setCopied(false), 4000);
    });
  };

  return (
    <div>
      {/* Поля для введення посилань */}
      <div>
        <label>
          Place your{' '}
          <Link
            href="https://www.dropbox.com"
            aria-label="Dropbox"
            className="text-primary-500"
            target="_blank"
          >
            dropbox
          </Link>{' '}
          public link
        </label>
        {links.map((item, idx) => (
          <div key={item.id} className="flex items-start space-x-2">
            <div className="w-full max-w-[40rem]">
              <input
                id={`link-${item.id}`}
                type="text"
                placeholder="https://www.dropbox.com/scl/fi/sfn7hfks7d7getajprg4r/animation"
                value={item.rawLink}
                onChange={(e) => handleLinkChange(item.id, e.target.value)}
                className={`
                    block
                    mb-2
                    p-[1.125rem]
                    w-full
                    rounded-xl
                    bg-neutral-100
                  border ${
                    item.error ? 'border-error-400' : 'border-neutral-100'
                  }
                  focus:outline-none focus:ring-1 focus:ring-${
                    item.error ? 'error-400' : 'primary-500'
                  }
                  transition-colors duration-300 ease-in-out
                    text-lg
                    ::placeholder:text-neutral-700
                  `}
              />
              {item.error && (
                <p className="mt-3 text-sm text-error-500">{item.error}</p>
              )}
            </div>
            {links.length > 1 && (
              <button
                type="button"
                onClick={() => removeLinkField(item.id)}
                className="mt-6 text-sm text-error-500 hover:text-red-400 active:text-red-700 transition-colors duration-300 ease-in-out cursor-pointer"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Кнопка для додавання ще одного поля */}
      <button
        type="button"
        onClick={addNewLinkField}
        className="flex items-center gap-1 text-sm text-primary-500 hover:text-primary-475 active:text-primary-600 transition-colors duration-300 ease-in-out cursor-pointer"
      >
        <PlusIcon />
        Add link
      </button>

      {/* Вивід згенерованого коду */}
      <div className="mt-8">
        <label>
          Get your{' '}
          <span className="code-snippet inline-block bg-neutral-100 px-2 text-primary-500 rounded-md">
            &lt;video&gt;
          </span>{' '}
          tag
        </label>
        <div className="relative">
          <HtmlHighlighter codeString={videoHTMLString} />

          <button
            onClick={handleCopy}
            aria-label="Copy to clipboard"
            className={`
              copy-button
              ${copied ? 'text-success-400' : 'text-primary-500'}`}
          >
            <div
              className={`
                ${copied ? 'opacity-0' : 'opacity-100'}
              `}
            >
              <CopyIcon />
            </div>

            <div
              className={`
                absolute
                inset-0
                ${copied ? 'opacity-100' : 'opacity-0'}
              `}
            >
              <CheckIcon />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
