import { ReactNode } from "react";
import './commentStyle.scss'

type CommentProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    children?: ReactNode;
    isHighlighted?: boolean;

}

export function Comments({
    children,
    content, 
    author,
    isHighlighted = false
    }: CommentProps){


    return(
        <div className={`comment ${isHighlighted ? 'highlighted' : ''}`}> {/** you can use classnames from NPM (yarn add classnames) */}
            <p>{content.split("\n").map(line=><div>{line}</div>)}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.avatar} />
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    )
}