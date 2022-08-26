import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import { createSave, deleteSave } from "../lib/save";

type SaveStatusProps = {
  id: string;
};

const SaveStatus: React.FC<SaveStatusProps> = ({ id }) => {
  const { data, mutate, error, isValidating } = useSWR(
    `/api/save/${id}`,
    fetcher
  );

  if (error) {
    return <p>failed to load</p>;
  }

  if (!data && isValidating) {
    return <p></p>;
  }

  if (data.status === true) {
    return (
      <p
        className={"text-lg hover:underline cursor-pointer"}
        onClick={async () => {
          await deleteSave(id);
          await mutate(null);
        }}
      >
        <RiBookmarkFill />
      </p>
    );
  }

  if (data.status === false) {
    return (
      <p
        className={"text-lg hover:underline cursor-pointer"}
        onClick={async () => {
          await createSave(id);
          await mutate(null);
        }}
      >
        <RiBookmarkLine />
      </p>
    );
  }

  return <p></p>;
};

export default SaveStatus;
