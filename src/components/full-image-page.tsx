import { clerkClient } from "@clerk/nextjs/server";
import { deleteImage, getImage } from "~/server/queries";
import { Button } from "./ui/button";

export default async function FullPageImageView(props: { photoId: string }) {
  const idAsNumber = Number(props.photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  const image = await getImage(idAsNumber);

  const clerk = await clerkClient();
  const uploaderInfo = await clerk.users.getUser(image.userId);

  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex shrink items-center justify-center">
        <img src={image.url} className="shrink object-contain" />;
      </div>
      <div className="flex w-48 shrink-0 flex-col border-l">
        <div className="border-b p-2 text-center text-lg font-bold">
          {image.name}
        </div>
        <div className="p-2">
          <span>Uploaded By:</span>
          <span>{uploaderInfo.fullName}</span>
        </div>
        <div className="p-2">
          <span>Created On:</span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="p-2">
          <form
            action={async () => {
              "use server";

              await deleteImage(idAsNumber);
            }}
          >
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
