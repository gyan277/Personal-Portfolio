export type GhanaLanguage = 'en' | 'tw' | 'ga' | 'ee' | 'ha' | 'dag' | 'nzi';

export const LANGUAGES: Record<GhanaLanguage, string> = {
  en: 'English',
  tw: 'Twi (Akan)',
  ga: 'Ga',
  ee: 'Ewe',
  ha: 'Hausa',
  dag: 'Dagbani',
  nzi: 'Nzema',
};

export const LANGUAGE_FLAGS: Record<GhanaLanguage, string> = {
  en: '🇬🇧',
  tw: '🇬🇭',
  ga: '🇬🇭',
  ee: '🇬🇭',
  ha: '🇬🇭',
  dag: '🇬🇭',
  nzi: '🇬🇭',
};

const translationCache = new Map<string, string>();

export async function translateText(
  text: string,
  targetLanguage: GhanaLanguage,
  context: string = 'civic policy document'
): Promise<string> {
  if (targetLanguage === 'en') return text;

  const cacheKey = `${text.slice(0, 50)}-${targetLanguage}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        targetLanguage,
        languageName: LANGUAGES[targetLanguage],
        context,
      }),
    });

    if (!response.ok) throw new Error('Translation request failed');

    const data = await response.json();
    const translated = data.translated || text;
    translationCache.set(cacheKey, translated);
    return translated;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
}

export async function simplifyPolicy(text: string): Promise<string[]> {
  try {
    const response = await fetch('/api/simplify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) throw new Error('Simplification request failed');

    const data = await response.json();
    return data.bullets || [];
  } catch (error) {
    console.error('Simplification error:', error);
    return [];
  }
}
