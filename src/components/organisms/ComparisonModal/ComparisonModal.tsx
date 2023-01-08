import {
  AppBar,
  Dialog,
  DialogProps,
  IconButton,
  Slide,
  Toolbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";

export type ComparisonModalProps = DialogProps & {
  handleCloseModal: () => void;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ComparisonModal = (props: ComparisonModalProps) => {
  return (
    <Dialog {...props} fullScreen TransitionComponent={Transition}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
            onClick={props.handleCloseModal}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Dialog>
  );
};
