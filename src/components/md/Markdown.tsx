import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import rehypeKatex from "rehype-katex";
import { Typography } from "@mui/material";

export function Markdown({
    content,
    align = "left",
    variant = "body1",
}: {
    content: string;
    align?: "left" | "right" | "inherit" | "center" | "justify" | undefined;
    variant?:
        | "inherit"
        | "body1"
        | "h1"
        | "h2"
        | "h3"
        | "h4"
        | "h5"
        | "h6"
        | "subtitle1"
        | "subtitle2"
        | "body2"
        | "caption"
        | "button"
        | "overline"
        | undefined;
}) {
    return (
        <Typography variant={variant} align={align}>
            <ReactMarkdown
                children={content}
                remarkPlugins={[remarkMath, remarkGfm, remarkFrontmatter]}
                rehypePlugins={[rehypeKatex]}
            />
        </Typography>
    );
}
