export type GalleryItem = {
  id: string;
  type: "image" | "video";
  category: "sudan" | "gaza" | "middle-east" | "africa";
  year: 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025;
  src: string;
  youtubeId?: string;
  thumbnail?: string;
  title?: string;
};

export const galleryItems: GalleryItem[] = [
  {
    id: "img-1",
    type: "image",
    category: "sudan",
    year: 2025,
    src: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80",
    title: "বন্যা পরিস্থিতি ২০২৫",
  },
  {
    id: "img-2",
    type: "image",
    category: "gaza",
    year: 2025,
    src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80",
    title: "খাদ্য বিতরণ ২০২৫",
  },
  {
    id: "img-3",
    type: "image",
    category: "middle-east",
    year: 2024,
    src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80",
    title: "স্বাবলম্বীকরণ কার্যক্রম",
  },
  {
    id: "img-4",
    type: "image",
    category: "africa",
    year: 2024,
    src: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=600&q=80",
    title: "কুরবানী ২০২৪",
  },
  {
    id: "img-5",
    type: "image",
    category: "africa",
    year: 2023,
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
    title: "শীতবস্ত্র বিতরণ ২০২৩",
  },
  {
    id: "img-6",
    type: "image",
    category: "sudan",
    year: 2023,
    src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=600&q=80",
    title: "বন্যা ত্রাণ ২০২৩",
  },
  {
    id: "img-7",
    type: "image",
    category: "gaza",
    year: 2025,
    src: "https://images.unsplash.com/photo-1615813967515-e1838c1c5116?auto=format&fit=crop&w=600&q=80",
    title: "খাদ্য বিতরণ",
  },
  {
    id: "img-8",
    type: "image",
    category: "sudan",
    year: 2024,
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80",
    title: "বন্যা ত্রাণ",
  },
  {
    id: "img-9",
    type: "image",
    category: "middle-east",
    year: 2023,
    src: "https://images.unsplash.com/photo-1517697471339-4aa32003c11a?auto=format&fit=crop&w=600&q=80",
    title: "স্বাবলম্বীকরণ",
  },
  {
    id: "img-10",
    type: "image",
    category: "africa",
    year: 2023,
    src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=600&q=80",
    title: "কুরবানী ২০২৩",
  },
  {
    id: "img-11",
    type: "image",
    category: "africa",
    year: 2025,
    src: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=600&q=80",
    title: "শীতবস্ত্র বিতরণ ২০২৫",
  },
  {
    id: "vid-1",
    type: "video",
    category: "gaza",
    year: 2023,
    src: "",
    youtubeId: "4LXnIpuIYgA",
    title: "মযলুম উম্মাহর ইফতার বিতরণ প্রতিবেদন- ২০২৩",
  },
  {
    id: "vid-2",
    type: "video",
    category: "sudan",
    year: 2023,
    src: "",
    youtubeId: "4LXnIpuIYgA",
    title: "বন্যা ত্রাণ কার্যক্রম ২০২৩",
  },
  {
    id: "vid-3",
    type: "video",
    category: "middle-east",
    year: 2024,
    src: "",
    youtubeId: "4LXnIpuIYgA",
    title: "স্বাবলম্বীকরণ প্রকল্প ২০২৪",
  },
  {
    id: "vid-4",
    type: "video",
    category: "africa",
    year: 2024,
    src: "",
    youtubeId: "4LXnIpuIYgA",
    title: "কুরবানী কার্যক্রম ২০২৪",
  },
  {
    id: "vid-5",
    type: "video",
    category: "africa",
    year: 2023,
    src: "",
    youtubeId: "4LXnIpuIYgA",
    title: "শীতবস্ত্র বিতরণ ২০২৩",
  },
  {
    id: "vid-6",
    type: "video",
    category: "gaza",
    year: 2025,
    src: "",
    youtubeId: "4LXnIpuIYgA",
    title: "ইফতার বিতরণ ২০২৫",
  },
  {
    id: "vid-7",
    type: "video",
    category: "sudan",
    year: 2024,
    src: "",
    youtubeId: "4LXnIpuIYgA",
    title: "বন্যা ত্রাণ ২০২৪",
  },
];

export const categories: { label: string; value: string }[] = [
  { label: "সবগুলো", value: "all" },
  { label: "সুদান", value: "sudan" },
  { label: "গাজা", value: "gaza" },
  { label: "মধ্যপ্রাচ্য", value: "middle-east" },
  { label: "আফ্রিকা", value: "africa" },
];

export const allYears: number[] = [2025, 2024, 2023, 2022, 2021, 2020, 2019];
