class TextBox
{
    constructor(props)
    {
        this.position = createVector(props.x, props.y);
        this.x = props.x;
        this.y = props.y;
        this.id = props.id;
        this.text = props.text;
        this.font = props.font;
        this.fontSize = props.fontSize;
        this.color = props.color;
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
                textAlign(CENTER);
                text(textBox.text, textBox.x,  textBox.y);   

            pop() 
        }
                    
    }
  
}
