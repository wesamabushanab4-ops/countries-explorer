import { createContext, useCallback, useContext } from 'react'

export type Language = 'en' | 'he' | 'ar'

export const languages: Language[] = ['en', 'he', 'ar']

const translations = {
  en: {
    countries: 'Countries', history: 'History', favorites: 'Favorites', about: 'About',
    darkMode: 'Dark mode', lightMode: 'Light mode', worldGuide: 'World guide',
    language: 'Language', homeLabel: 'Countries Explorer home', mainNav: 'Main navigation',
    heroEyebrow: 'A LITTLE CLOSER TO EVERYWHERE', heroTitleOne: 'One world.',
    heroTitleTwo: 'Endless stories.', heroDescription: 'Pick a country and discover the places, people, and details that make it unique.',
    exploreAtPace: 'Explore at your own pace', poweredBy: 'Your personal world atlas',
    globeLabel: 'THE WORLD, IN YOUR HANDS', startExploring: 'START EXPLORING',
    chooseDestination: 'Choose your next destination', dataReady: 'Country data ready',
    country: 'COUNTRY', filterRegion: 'FILTER BY REGION', allRegions: 'All regions',
    chooseCountry: 'Choose a country', loadingCountries: 'Loading countries…',
    countriesToDiscover: 'countries to discover', countryListError: 'We couldn’t load the country list.',
    tryAgain: 'Try again', gatheringDetails: 'Gathering details…',
    findingStory: 'Finding the story behind this place.', countryInfoError: 'Failed to load country information',
    nextDiscovery: 'YOUR NEXT DISCOVERY', worldWaiting: 'A whole world is waiting.',
    chooseCountryDetails: 'Choose a country above to see its capital, region, population, area, and flag.',
    didYouKnow: 'DID YOU KNOW?', countryCountText: 'countries & territories to explore, each with a story all its own.',
    yourJourney: 'YOUR JOURNEY', recentDiscoveries: 'Recent discoveries',
    firstDiscovery: 'Your first discovery will appear here.', madeCurious: 'Made for the curious.',
    dataCourtesy: 'Country information from our included dataset.',
    countryProfile: 'COUNTRY PROFILE', removeFavorite: 'Remove from favorites',
    addFavorite: 'Add to favorites', capital: 'Capital', region: 'Region',
    population: 'Population', area: 'Area', notListed: 'Not listed', partOf: 'Part of',
    placesToKeep: 'PLACES TO KEEP CLOSE', lovedWorldOne: 'Your world,', lovedWorldTwo: 'well loved.',
    favoritesDescription: 'Save the countries you want to remember or come back to.',
    savedPlaces: 'SAVED PLACES', nothingSaved: 'Nothing saved just yet',
    addFavoritesHint: 'Tap the heart on a country profile to add it to your favorites.',
    favoritesStay: 'Favorites stay in this browser.',
    atlas: 'YOUR PERSONAL ATLAS', historyTitleOne: 'Every place leaves', historyTitleTwo: 'a little trace.',
    historyDescription: 'Revisit the countries you’ve explored along the way.',
    explorationLog: 'EXPLORATION LOG', searchHistory: 'Search history',
    clearHistory: 'Clear history', journeyStarts: 'Your journey starts here',
    historyEmpty: 'Choose a country on the Countries page and it will appear in your exploration log.',
    searchTime: 'Search time', countryHeading: 'Country', capitalHeading: 'Capital',
    regionHeading: 'Region', historyStays: 'Your history stays in this browser.',
    aboutEyebrow: 'A WORLD OF DISCOVERY', meetAtlas: 'Meet your', worldAtlas: 'world atlas.',
    aboutIntro: 'Explore the places, people, and details that make every country unique.',
    personalAtlas: 'YOUR PERSONAL ATLAS', goBeyond: 'Go beyond the', map: 'map.',
    aboutStory: 'Choose from more than 195 countries and territories to discover flags, capitals, regions, population, and land area. Filter by region, save favorite places, and revisit your exploration history whenever you like.',
    waysExplore: 'ways to explore', developer: 'THE DEVELOPER', developerIntro: 'Created to make exploring country facts simple, visual, and fun.',
    builtWith: 'Built with React & TypeScript', interactiveProfiles: 'Interactive country profiles',
    favoritesHistory: 'Favorites and search history', themesFeature: 'Light and dark themes',
    builtBy: 'Built by Wesam Gadban.', africa: 'Africa', americas: 'Americas',
    asia: 'Asia', europe: 'Europe', oceania: 'Oceania', antarctic: 'Antarctic',
    other: 'Other', switchLanguage: 'Change language', genericError: 'Please check your connection and try again.', flagOf: 'Flag of',
    countriesTerritories: 'countries & territories',
  },
  he: {
    countries: 'מדינות', history: 'היסטוריה', favorites: 'מועדפים', about: 'אודות',
    darkMode: 'מצב כהה', lightMode: 'מצב בהיר', worldGuide: 'מדריך עולמי',
    language: 'שפה', homeLabel: 'דף הבית של מדריך המדינות', mainNav: 'ניווט ראשי',
    heroEyebrow: 'קצת יותר קרוב לכל מקום', heroTitleOne: 'עולם אחד.',
    heroTitleTwo: 'סיפורים בלי סוף.', heroDescription: 'בחרו מדינה וגלו את המקומות, האנשים והפרטים שהופכים אותה לייחודית.',
    exploreAtPace: 'לגלות בקצב שלכם', poweredBy: 'אטלס העולם האישי שלכם',
    globeLabel: 'העולם בכף ידכם', startExploring: 'מתחילים לגלות',
    chooseDestination: 'בחרו את היעד הבא שלכם', dataReady: 'נתוני המדינות מוכנים',
    country: 'מדינה', filterRegion: 'סינון לפי אזור', allRegions: 'כל האזורים',
    chooseCountry: 'בחירת מדינה', loadingCountries: 'המדינות נטענות…',
    countriesToDiscover: 'מדינות לגילוי', countryListError: 'לא ניתן לטעון את רשימת המדינות.',
    tryAgain: 'נסו שוב', gatheringDetails: 'טוענים פרטים…',
    findingStory: 'מגלים את הסיפור של המקום הזה.', countryInfoError: 'טעינת פרטי המדינה נכשלה',
    nextDiscovery: 'הגילוי הבא שלכם', worldWaiting: 'עולם שלם מחכה לכם.',
    chooseCountryDetails: 'בחרו מדינה כדי לראות את עיר הבירה, האזור, האוכלוסייה, השטח והדגל שלה.',
    didYouKnow: 'הידעתם?', countryCountText: 'מדינות וטריטוריות מחכות לגילוי, ולכל אחת סיפור משלה.',
    yourJourney: 'המסע שלכם', recentDiscoveries: 'גילויים אחרונים',
    firstDiscovery: 'הגילוי הראשון שלכם יופיע כאן.', madeCurious: 'נוצר עבור סקרנים.',
    dataCourtesy: 'מידע המדינות מגיע ממאגר הנתונים המצורף.',
    countryProfile: 'פרופיל מדינה', removeFavorite: 'הסרה מהמועדפים',
    addFavorite: 'הוספה למועדפים', capital: 'עיר בירה', region: 'אזור',
    population: 'אוכלוסייה', area: 'שטח', notListed: 'לא צוין', partOf: 'חלק מ־',
    placesToKeep: 'מקומות לשמור קרוב', lovedWorldOne: 'העולם שלכם,', lovedWorldTwo: 'באהבה.',
    favoritesDescription: 'שמרו מדינות שתרצו לזכור או לבקר בהן שוב.',
    savedPlaces: 'מקומות שמורים', nothingSaved: 'עדיין לא שמרתם דבר',
    addFavoritesHint: 'לחצו על הלב בפרופיל של מדינה כדי להוסיף אותה למועדפים.',
    favoritesStay: 'המועדפים נשמרים בדפדפן הזה.',
    atlas: 'האטלס האישי שלכם', historyTitleOne: 'כל מקום משאיר', historyTitleTwo: 'זיכרון קטן.',
    historyDescription: 'חזרו למדינות שגיליתם לאורך הדרך.',
    explorationLog: 'יומן גילויים', searchHistory: 'היסטוריית חיפושים',
    clearHistory: 'ניקוי ההיסטוריה', journeyStarts: 'המסע שלכם מתחיל כאן',
    historyEmpty: 'בחרו מדינה בעמוד המדינות והיא תופיע ביומן הגילויים שלכם.',
    searchTime: 'זמן החיפוש', countryHeading: 'מדינה', capitalHeading: 'עיר בירה',
    regionHeading: 'אזור', historyStays: 'ההיסטוריה נשמרת בדפדפן הזה.',
    aboutEyebrow: 'עולם של גילויים', meetAtlas: 'הכירו את', worldAtlas: 'אטלס העולם.',
    aboutIntro: 'גלו את המקומות, האנשים והפרטים שהופכים כל מדינה לייחודית.',
    personalAtlas: 'האטלס האישי שלכם', goBeyond: 'מעבר ל', map: 'מפה.',
    aboutStory: 'בחרו מתוך יותר מ־195 מדינות וטריטוריות כדי לגלות דגלים, ערי בירה, אזורים, אוכלוסייה ושטח. סננו לפי אזור, שמרו מקומות מועדפים וחזרו להיסטוריית הגילויים שלכם בכל זמן.',
    waysExplore: 'דרכי גילוי', developer: 'המפתח', developerIntro: 'נוצר כדי להפוך את גילוי המידע על מדינות לפשוט, חזותי ומהנה.',
    builtWith: 'נבנה עם React ו־TypeScript', interactiveProfiles: 'פרופילים אינטראקטיביים למדינות',
    favoritesHistory: 'מועדפים והיסטוריית חיפושים', themesFeature: 'מצב בהיר וכהה',
    builtBy: 'נבנה על ידי וסאם גדבן.', africa: 'אפריקה', americas: 'אמריקה',
    asia: 'אסיה', europe: 'אירופה', oceania: 'אוקיאניה', antarctic: 'אנטארקטיקה',
    other: 'אחר', switchLanguage: 'שינוי שפה', genericError: 'בדקו את החיבור ונסו שוב.', flagOf: 'הדגל של',
    countriesTerritories: 'מדינות וטריטוריות',
  },
  ar: {
    countries: 'الدول', history: 'السجل', favorites: 'المفضلة', about: 'حول التطبيق',
    darkMode: 'الوضع الداكن', lightMode: 'الوضع الفاتح', worldGuide: 'دليل العالم',
    language: 'اللغة', homeLabel: 'الصفحة الرئيسية لمستكشف الدول', mainNav: 'التنقل الرئيسي',
    heroEyebrow: 'أقرب قليلاً إلى كل مكان', heroTitleOne: 'عالم واحد.',
    heroTitleTwo: 'حكايات لا تنتهي.', heroDescription: 'اختر دولة واكتشف الأماكن والناس والتفاصيل التي تجعلها مميزة.',
    exploreAtPace: 'اكتشف العالم على راحتك', poweredBy: 'أطلسك الشخصي للعالم',
    globeLabel: 'العالم بين يديك', startExploring: 'ابدأ الاستكشاف',
    chooseDestination: 'اختر وجهتك التالية', dataReady: 'بيانات الدول جاهزة',
    country: 'الدولة', filterRegion: 'تصفية حسب المنطقة', allRegions: 'كل المناطق',
    chooseCountry: 'اختر دولة', loadingCountries: 'جارٍ تحميل الدول…',
    countriesToDiscover: 'دولة لاكتشافها', countryListError: 'تعذر تحميل قائمة الدول.',
    tryAgain: 'حاول مرة أخرى', gatheringDetails: 'جارٍ جمع التفاصيل…',
    findingStory: 'نبحث عن حكاية هذا المكان.', countryInfoError: 'تعذر تحميل معلومات الدولة',
    nextDiscovery: 'اكتشافك التالي', worldWaiting: 'عالم كامل بانتظارك.',
    chooseCountryDetails: 'اختر دولة لمعرفة عاصمتها ومنطقتها وسكانها ومساحتها وعلمها.',
    didYouKnow: 'هل تعلم؟', countryCountText: 'دولة وإقليم لاكتشافها، ولكل منها حكاية مميزة.',
    yourJourney: 'رحلتك', recentDiscoveries: 'اكتشافات حديثة',
    firstDiscovery: 'سيظهر اكتشافك الأول هنا.', madeCurious: 'صُنع لمحبي الاستكشاف.',
    dataCourtesy: 'معلومات الدول من مجموعة البيانات المرفقة.',
    countryProfile: 'ملف الدولة', removeFavorite: 'إزالة من المفضلة',
    addFavorite: 'إضافة إلى المفضلة', capital: 'العاصمة', region: 'المنطقة',
    population: 'عدد السكان', area: 'المساحة', notListed: 'غير مدرج', partOf: 'جزء من',
    placesToKeep: 'أماكن تستحق الاحتفاظ بها', lovedWorldOne: 'عالمك،', lovedWorldTwo: 'بكل محبة.',
    favoritesDescription: 'احفظ الدول التي تريد تذكرها أو العودة إليها.',
    savedPlaces: 'أماكن محفوظة', nothingSaved: 'لم تحفظ أي دولة بعد',
    addFavoritesHint: 'اضغط على القلب في ملف الدولة لإضافتها إلى المفضلة.',
    favoritesStay: 'تُحفظ المفضلة في هذا المتصفح.',
    atlas: 'أطلسك الشخصي', historyTitleOne: 'كل مكان يترك', historyTitleTwo: 'أثراً صغيراً.',
    historyDescription: 'عد إلى الدول التي اكتشفتها خلال رحلتك.',
    explorationLog: 'سجل الاستكشاف', searchHistory: 'سجل البحث',
    clearHistory: 'مسح السجل', journeyStarts: 'رحلتك تبدأ هنا',
    historyEmpty: 'اختر دولة من صفحة الدول وستظهر هنا في سجل الاستكشاف.',
    searchTime: 'وقت البحث', countryHeading: 'الدولة', capitalHeading: 'العاصمة',
    regionHeading: 'المنطقة', historyStays: 'يُحفظ السجل في هذا المتصفح.',
    aboutEyebrow: 'عالم من الاكتشافات', meetAtlas: 'تعرّف على', worldAtlas: 'أطلس العالم.',
    aboutIntro: 'اكتشف الأماكن والناس والتفاصيل التي تجعل كل دولة فريدة.',
    personalAtlas: 'أطلسك الشخصي', goBeyond: 'ما وراء', map: 'الخريطة.',
    aboutStory: 'اختر من بين أكثر من 195 دولة وإقليماً لاكتشاف الأعلام والعواصم والمناطق والسكان والمساحة. صفِّ النتائج حسب المنطقة، واحفظ الأماكن المفضلة، وعد إلى سجل استكشافك متى شئت.',
    waysExplore: 'طرق للاستكشاف', developer: 'المطوّر', developerIntro: 'صُمم لجعل استكشاف معلومات الدول سهلاً ومرئياً وممتعاً.',
    builtWith: 'بُني باستخدام React وTypeScript', interactiveProfiles: 'ملفات تفاعلية للدول',
    favoritesHistory: 'المفضلة وسجل البحث', themesFeature: 'الوضعان الفاتح والداكن',
    builtBy: 'بواسطة وسام غدبان.', africa: 'أفريقيا', americas: 'الأمريكتان',
    asia: 'آسيا', europe: 'أوروبا', oceania: 'أوقيانوسيا', antarctic: 'أنتاركتيكا',
    other: 'أخرى', switchLanguage: 'تغيير اللغة', genericError: 'تحقق من اتصالك وحاول مرة أخرى.', flagOf: 'علم',
    countriesTerritories: 'دولة وإقليم',
  },
} as const

export type TranslationKey = keyof typeof translations.en

export interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
}

export const LanguageContext = createContext<LanguageContextValue>({
  language: 'en',
  setLanguage: () => undefined,
})

export function useTranslation() {
  const { language, setLanguage } = useContext(LanguageContext)
  const t = useCallback((key: TranslationKey) => translations[language][key], [language])
  return {
    language,
    setLanguage,
    t,
  }
}

export function localizedCountryName(code: string, fallback: string, language: Language): string {
  if (language === 'en') return fallback
  try {
    return new Intl.DisplayNames([language], { type: 'region' }).of(code.toUpperCase()) ?? fallback
  } catch {
    return fallback
  }
}

export function localizedRegion(region: string, language: Language): string {
  const key: Record<string, TranslationKey> = {
    Africa: 'africa',
    Americas: 'americas',
    Asia: 'asia',
    Europe: 'europe',
    Oceania: 'oceania',
    Antarctic: 'antarctic',
    Other: 'other',
  }
  const translationKey = key[region]
  return translationKey ? translations[language][translationKey] : region
}
