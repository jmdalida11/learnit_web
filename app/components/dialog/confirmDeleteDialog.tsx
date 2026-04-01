import { Button } from "@headlessui/react";
import BaseDialog from "./baseDialog";

interface Props {
  open: boolean;
  title: string;
  handleDelete: () => void;
  handleCancel: () => void;
}

const ConfirmDeleteDialog = ({
  open,
  title,
  handleDelete,
  handleCancel,
}: Props) => {
  return (
    <BaseDialog open={open} title={title}>
      <p className="py-4">
        Are you sure you want to delete this item? This action cannot be undone.
      </p>
      <div className="modal-action">
        <Button className="btn btn-error" onClick={handleDelete}>
          Delete
        </Button>
        <Button className="btn" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </BaseDialog>
  );
};

export default ConfirmDeleteDialog;
