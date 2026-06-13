import {
  Dialog as AlertDialog,
  DialogBody as AlertDialogBody,
  DialogClose as AlertDialogCancel,
  DialogContent,
  DialogDescription as AlertDialogDescription,
  DialogFooter as AlertDialogFooter,
  DialogHeader as AlertDialogHeader,
  DialogTitle as AlertDialogTitle,
  DialogTrigger as AlertDialogTrigger,
  type DialogCloseProps,
  type DialogContentProps,
} from "../dialog/index.js"

const AlertDialogContent = (props: DialogContentProps) => (
  <DialogContent role="alertdialog" {...props} />
)

export {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCancel,
  type DialogCloseProps as AlertDialogCancelProps,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
}
