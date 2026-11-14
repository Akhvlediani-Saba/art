export type Lang = "ka" | "en";
export type L = Record<Lang, string>;

export type Book = {
  slug: string;
  color: string;
  name: L;
  title: L;
  desc: L;
  lessons: L[];
};

// Placeholder content — replace with the real book chapters.
export const BOOKS: Book[] = [
  {
    slug: "panduri",
    color: "#5C1A12",
    name: { ka: "ფანდური", en: "Panduri" },
    title: { ka: "ფანდური — დამწყებთათვის", en: "Panduri for beginners" },
    desc: {
      ka: "ქართული ხალხური სიმღერები ფანდურზე, აკორდებიდან სრულ სიმღერამდე.",
      en: "Georgian folk songs on the panduri, from first chords to full songs.",
    },
    lessons: [
      { ka: "ფანდურის აწყობა", en: "Tuning the panduri" },
      { ka: "ხელის დაყენება", en: "Hand position" },
      { ka: "პირველი აკორდები", en: "First chords" },
      { ka: "რიტმი და ჩამოკვრა", en: "Rhythm and strumming" },
      { ka: "პირველი სიმღერა", en: "First song" },
      { ka: "[შემდეგი გაკვეთილი]", en: "[Next lesson]" },
    ],
  },
  {
    slug: "guitar",
    color: "#163A37",
    name: { ka: "გიტარა", en: "Guitar" },
    title: { ka: "გიტარა — დამწყებთათვის", en: "Guitar for beginners" },
    desc: {
      ka: "ძირითადი აკორდები, რიტმი და ქართული სიმღერები გიტარაზე.",
      en: "Core chords, rhythm and Georgian songs on the guitar.",
    },
    lessons: [
      { ka: "გიტარის აწყობა", en: "Tuning the guitar" },
      { ka: "ხელის დაყენება", en: "Hand position" },
      { ka: "პირველი აკორდები", en: "First chords" },
      { ka: "რიტმი და ჩამოკვრა", en: "Rhythm and strumming" },
      { ka: "პირველი სიმღერა", en: "First song" },
      { ka: "[შემდეგი გაკვეთილი]", en: "[Next lesson]" },
    ],
  },
];

export function getBook(slug: string | undefined): Book | undefined {
  return BOOKS.find((b) => b.slug === slug);
}

/** Lesson 1 of every book is open to everyone. */
export const FREE_LESSON = 1;

/** Demo only: the code that unlocks a book on the test site. */
export const DEMO_CODE = "DEMO-1234-5678";
