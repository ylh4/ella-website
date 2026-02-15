import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hashSync } from "bcryptjs";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
const prisma = new PrismaClient({ adapter });

async function main() {
  // Seed admin user
  const admin = await prisma.user.upsert({
    where: { email: "ella@example.com" },
    update: {},
    create: {
      email: "ella@example.com",
      password: hashSync("ellaadmin123", 10),
      name: "Ella",
    },
  });
  console.log("Admin user created:", admin.email);

  // Seed Books
  await prisma.book.createMany({
    skipDuplicates: true,
    data: [
      {
        title: "The Magical Garden",
        slug: "the-magical-garden",
        description:
          "A story about a girl who discovers a secret garden where flowers can talk and trees tell stories.",
        content:
          "<p>Once upon a time, in a small town nestled between rolling hills, there lived a curious girl named Lily...</p>",
        featured: true,
        publishedAt: new Date("2025-06-15"),
      },
      {
        title: "Adventures in Starland",
        slug: "adventures-in-starland",
        description:
          "Join Mia as she travels through the galaxy, meeting friendly aliens and discovering new worlds.",
        content:
          "<p>Mia had always dreamed of visiting the stars. One night, her wish came true...</p>",
        featured: false,
        publishedAt: new Date("2025-09-01"),
      },
      {
        title: "The Brave Little Cloud",
        slug: "the-brave-little-cloud",
        description:
          "A tiny cloud learns that even the smallest can make the biggest difference.",
        content:
          "<p>High above the world, where the sky meets the sun, lived a tiny cloud named Puff...</p>",
        featured: true,
        publishedAt: new Date("2025-12-10"),
      },
    ],
  });
  console.log("Books seeded");

  // Seed Poems
  await prisma.poem.createMany({
    skipDuplicates: true,
    data: [
      {
        title: "Dancing Raindrops",
        slug: "dancing-raindrops",
        content:
          "Raindrops dance upon my window,\nTap-tap-tapping, soft and slow.\nEach one tells a tiny tale,\nOf clouds and wind and mountain trail.\n\nThey slide like tears of joy and grace,\nLeaving trails I try to trace.\nAnd when the sun peeks through once more,\nRainbows paint the sky galore.",
        featured: true,
        publishedAt: new Date("2025-07-20"),
      },
      {
        title: "My Cat's Secret Life",
        slug: "my-cats-secret-life",
        content:
          "When I'm at school, my cat transforms,\nInto a king of furry forms.\nHe wears a crown of golden thread,\nAnd rules the house from my own bed.\n\nHe hosts a tea for all his friends,\nThe mice, the birds — the fun never ends.\nBut when I'm home, he plays it cool,\nJust a cat — nobody's fool.",
        featured: true,
        publishedAt: new Date("2025-08-05"),
      },
      {
        title: "The Stars Know My Name",
        slug: "the-stars-know-my-name",
        content:
          "I whispered my name to the evening sky,\nAnd watched it float up ever so high.\nThe stars all blinked and spelled it out,\nIn twinkling lights without a doubt.\n\nNow every night I look above,\nAnd feel surrounded by their love.\nThey know my dreams, they know my game,\nThe stars, you see, they know my name.",
        featured: false,
        publishedAt: new Date("2025-10-12"),
      },
    ],
  });
  console.log("Poems seeded");

  // Seed Artwork
  await prisma.artwork.createMany({
    skipDuplicates: true,
    data: [
      {
        title: "Sunset Over the Mountains",
        slug: "sunset-over-the-mountains",
        description:
          "A vibrant watercolor painting capturing the beauty of a mountain sunset.",
        imageUrl: "/images/placeholder-art-1.jpg",
        medium: "Watercolor",
        featured: true,
        publishedAt: new Date("2025-05-10"),
      },
      {
        title: "My Best Friend",
        slug: "my-best-friend",
        description: "A portrait of my cat drawn with colored pencils.",
        imageUrl: "/images/placeholder-art-2.jpg",
        medium: "Colored Pencil",
        featured: true,
        publishedAt: new Date("2025-08-22"),
      },
      {
        title: "Underwater World",
        slug: "underwater-world",
        description:
          "An imaginative scene of life beneath the ocean waves.",
        imageUrl: "/images/placeholder-art-3.jpg",
        medium: "Acrylic",
        featured: false,
        publishedAt: new Date("2025-11-05"),
      },
    ],
  });
  console.log("Artwork seeded");

  // Seed Videos
  await prisma.video.createMany({
    skipDuplicates: true,
    data: [
      {
        title: "How I Write My Stories",
        slug: "how-i-write-my-stories",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        description:
          "In this video, I share my writing process and tips for young authors!",
        category: "Writing",
        featured: true,
        publishedAt: new Date("2025-06-01"),
      },
      {
        title: "Painting a Galaxy",
        slug: "painting-a-galaxy",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        description:
          "Watch me paint a beautiful galaxy using watercolors. It's easier than you think!",
        category: "Art",
        featured: false,
        publishedAt: new Date("2025-09-15"),
      },
    ],
  });
  console.log("Videos seeded");

  // Seed Blog Posts
  await prisma.blogPost.createMany({
    skipDuplicates: true,
    data: [
      {
        title: "My Journey as a Young Author",
        slug: "my-journey-as-a-young-author",
        content:
          "<h2>How It All Started</h2><p>I wrote my first story when I was 7 years old. It was about a magical cat who could fly. Since then, I've been writing every single day!</p><h2>Tips for Young Writers</h2><p>If you want to start writing, here are my top tips:</p><ul><li>Write every day, even if it's just a little bit</li><li>Read lots of books for inspiration</li><li>Don't be afraid to use your imagination</li><li>Share your stories with friends and family</li></ul>",
        excerpt:
          "From my first story at age 7 to publishing my own books — here's my writing journey!",
        tags: ["writing", "journey", "tips"],
        featured: true,
        publishedAt: new Date("2025-07-01"),
      },
      {
        title: "5 Fun Art Projects for Kids",
        slug: "5-fun-art-projects-for-kids",
        content:
          "<h2>Get Creative!</h2><p>Art is one of my favorite things to do. Here are 5 easy projects you can try at home:</p><ol><li><strong>Splatter Painting</strong> — Use a toothbrush to splatter paint on paper</li><li><strong>Leaf Prints</strong> — Press painted leaves onto paper for cool prints</li><li><strong>Paper Mache Animals</strong> — Make your favorite animal with paper mache</li><li><strong>Rock Painting</strong> — Turn rocks into tiny works of art</li><li><strong>Collage Art</strong> — Cut out magazine pictures to make a collage</li></ol>",
        excerpt:
          "Easy and fun art projects you can try at home with materials you already have!",
        tags: ["art", "crafts", "kids"],
        featured: true,
        publishedAt: new Date("2025-10-20"),
      },
      {
        title: "What I Learned This Year",
        slug: "what-i-learned-this-year",
        content:
          "<p>This year has been amazing! I learned so many new things:</p><ul><li>How to write better dialogue in stories</li><li>New watercolor techniques</li><li>How to edit my own videos</li><li>That practice really does make progress</li></ul><p>I can't wait to see what next year brings!</p>",
        excerpt:
          "Reflecting on all the creative lessons and growth from this past year.",
        tags: ["reflection", "growth", "learning"],
        featured: false,
        publishedAt: new Date("2025-12-28"),
      },
    ],
  });
  console.log("Blog posts seeded");

  console.log("Seed completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
