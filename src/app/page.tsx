import { SignedIn, SignedOut } from "@clerk/nextjs";
import { db } from "~/server/db";

// const mockUrls = [
//   "https://sportsworld.co.uk/wp-content/smush-webp/2025/02/Real-madrid-team-1440x960.jpg.webp",
//   "https://static.vecteezy.com/ti/gratis-vektor/p1/10994249-real-madrid-logo-symbol-design-spanien-fussball-europaische-lander-fussballmannschaften-illustration-kostenlos-vektor.jpg",
//   "https://www.arsenal.com/sites/default/files/styles/desktop_16x9/public/images/mbappe-celeb-real-madrid_qhksqkhg.png?h=d797ae95&auto=webp&itok=cT2ZveMD",
//   "https://www.webwandtattoo.com/de/img/hgn006-jpg/folder/products-listado-merchant/aufkleber-wappen-real-madrid-cf.jpg",
// ];

// const mockImages = mockUrls.map((url, index) => {
//   return {
//     id: index + 1,
//     url,
//   };
// });

async function Images() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  console.log(images);

  return (
    <div className="felx-wrap flex gap-4">
      {images.map((image) => (
        <div key={image.id} className="flex w-48 flex-col">
          <img src={image.url} />
          <div>{image.name}</div>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main>
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
