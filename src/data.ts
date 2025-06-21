import type { Product, Category } from "./types"

export const categoriesData: Category[] = [
  { id: "offers", name: "Offers", image: "../top4.png" },
  { id: "seabass", name: "Turkish Sea Bass", image: "/top1.png" },
  { id: "shrimp", name: "Jumbo Shrimp", image: "/top2.png" },
  { id: "salmon", name: "Nigerian Salmon", image: "/top3.png" },
]

export const offersData: Product[] = [
  {
    id: "offer-1",
    name: "5 kg Peeled Jumbo Shrimp Box + 1 kg Salmon",
    price: 5.0,
    image: "/+2 kg Salmon.png",
  },
  {
    id: "offer-2",
    name: "5 kg Premium Salmon Box",
    price: 4.0,
    image: "https://cdn.altibbi.com/cdn/cache/1000x500/image/2020/11/10/56380b8d67c2bcec2e15c13eb881e900.png",
  },
  {
    id: "offer-3",
    name: "Shrimp Offer - Irresistible Taste!",
    price: 4.99,
    image: "/robi.jpg",
  },
  {
    id: "offer-4",
    name: "Shari Offer - Perfect Daily Taste!",
    price: 5.0,
    image: "../sari.jpg",
  },
  {
    id: "offer-5",
    name: "Seabream Offer - Best Sea Flavors!",
    price: 5.0,
    image: "/sbt.jpg",
  },
  {
    id: "offer-6",
    name: "Fresh Grouper - Your Table Deserves the Best!",
    price: 6.0,
    image: "/hmo.jpg",
  },
]

export const allProductsData: Product[] = [
  {
    id: "prod-1",
    name: "National Offer",
    description: "10 kg Turkish Sea Bass Box Size 800-1000.",
    price: 4.2,
    image: "/pr-0.png",
  },
  {
    id: "prod-2",
    name: "Today's Special",
    description: "5 kg Peeled Jumbo Shrimp Box + 1 kg Salmon",
    price: 5.0,
    image: "/+2 kg Salmon.png",
  },
  {
    id: "prod-3",
    name: "Grouper Fillet",
    description: "1 kg Grouper Fillet.",
    price: 2.5,
    image: "/pr-2.png",
  },
  {
    id: "prod-4",
    name: "Nigerian Salmon",
    description: "1 kg Nigerian Salmon.",
    price: 2.5,
    image: "/nigerian-salmon.jpg",
  },
]
