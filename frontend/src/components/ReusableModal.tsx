import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ModalType } from "@/types/type";

function ReusableModal({
  open,
  onOpenChange,
  alertDialogTitle,
  alertDialogDescription,
  alertDialogFooter,
}: ModalType) {
  return (
    <>
      {open && (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                {alertDialogTitle}
              </AlertDialogTitle>
              {alertDialogDescription}
            </AlertDialogHeader>
            <AlertDialogFooter>{alertDialogFooter}</AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}

export default ReusableModal;
