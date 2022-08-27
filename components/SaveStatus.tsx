import cn from "classnames";
import { useSession } from "next-auth/react";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";
import useSWR, { useSWRConfig } from "swr";
import fetcher from "../lib/fetcher";
import { createSave, deleteSave } from "../lib/save";

type SaveStatusProps = {
  id: string;
};

const SaveStatus: React.FC<SaveStatusProps> = ({ id }) => {
  const { status } = useSession();
  const { mutate: userMutate } = useSWRConfig();

  const {
    data,
    mutate: saveMutate,
    error,
    isValidating,
  } = useSWR(`/api/save/${id}`, fetcher);

  if (error) {
    return (
      <p className={cn(status === "unauthenticated" ? "hidden" : "")}>
        failed to load
      </p>
    );
  }

  if (!data && isValidating) {
    return <p className={cn(status === "unauthenticated" ? "hidden" : "")}></p>;
  }

  if (data.status === false) {
    return (
      <p
        className={cn(
          status === "unauthenticated"
            ? "hidden"
            : "text-lg hover:underline cursor-pointer"
        )}
        onClick={async () => {
          await createSave(id);
          await saveMutate(null);
          await userMutate("/api/me");
        }}
      >
        <RiBookmarkLine />
      </p>
    );
  }

  if (data.status === true) {
    return (
      <p
        className={cn(
          status === "unauthenticated"
            ? "hidden"
            : "text-lg hover:underline cursor-pointer"
        )}
        onClick={async () => {
          await deleteSave(id);
          await saveMutate(null);
          await userMutate("/api/me");
        }}
      >
        <RiBookmarkFill />
      </p>
    );
  }

  return <p className={cn(status === "unauthenticated" ? "hidden" : "")}></p>;
};

export default SaveStatus;
