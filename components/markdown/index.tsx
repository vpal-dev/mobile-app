import MarkdownD from 'react-native-markdown-display';

type MarkdownProps = {
  children: string
}

export const Markdown = ({ children }: MarkdownProps) => {
  return (
    <MarkdownD style={{
      body: {
        // fontFamily: "Satoshi-500",
      },
      heading1: {
        display: 'none',
      },
      heading2: {
        fontSize: 16,
        fontWeight: 700,
        marginVertical: 10,
        marginTop: 20
      }
    }}>
      {children}
    </MarkdownD>

  )
}

