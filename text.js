class TextBox
{
    constructor(props)
    {
        this.position = createVector(props.x * scale.x, props.y * scale.y);
        this.x = props.x * scale.x;
        this.y = props.y * scale.y;
        this.id = props.id;
        this.text = props.text;
        this.font = props.font;
        this.fontSize = props.fontSize * scale.x;
        this.color = props.color;
        this.align = props.align || CENTER;
    }

    display()
    {
        let textBox = this;
        if (textBox.visibility != "hidden")
        {
            push()
                noStroke()
                fill(textBox.color)
                textSize(textBox.fontSize)
                textFont(textBox.font)
                textAlign(textBox.align);
                text(textBox.text, textBox.x,  textBox.y);   

            pop() 
        }
                    
    }
  
}
