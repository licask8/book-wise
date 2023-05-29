import { styled } from "../../../stitches.config";

export const Container = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  paddingBottom: 48,

  "&::-webkit-scrollbar": {
    display: 'none'
  },

  "> section": {
    display: 'flex',
    flexDirection: 'column',
    gap: '$3',
    marginTop: '$4',
  }
})