function displayPortals()
{
    levels[currentLevel].portals.forEach(portal => {
        portal.display();
    });
}

class Portal
{
    constructor(props)
    {
        this.in = props.in;
        this.out = props.out;
    }

    display() 
    {
        let portal = this;

        let rotateAngle = timeElapsed / 25;


        if (gameMode == "Build")
        {
            push()
                translate(portal.in.x - portalRadius, portal.in.y - portalRadius);
                rotate(rotateAngle);
                image(icon.portal2, -portalDiameter, -portalDiameter, portalDiameter * 2, portalDiameter * 2);
            pop()
            push()
                translate(portal.out.x - portalRadius, portal.out.y - portalRadius);
                rotate(rotateAngle);
                image(icon.portal2, -portalDiameter, -portalDiameter, portalDiameter * 2, portalDiameter * 2);
            pop()
        }
        else
        {
            push()
                translate(portal.in.x - portalRadius, portal.in.y - portalRadius);
                rotate(rotateAngle);
                image(icon.portal1, -portalDiameter, -portalDiameter, portalDiameter * 2, portalDiameter * 2);
            pop()
            push()
                translate(portal.out.x - portalRadius, portal.out.y - portalRadius);
                rotate(rotateAngle);
                image(icon.portal1, -portalDiameter, -portalDiameter, portalDiameter * 2, portalDiameter * 2);
            pop()
        }



        




        // push()
        //     stroke("rgba(0,0,255,0.25)")
        //     fill("rgba(0,0,0,0.275)");
            
        //     strokeWeight(3)
        //     ellipse(portal.in.x - portalRadius, portal.in.y - portalRadius, portalDiameter, portalDiameter);
        //     ellipse(portal.out.x - portalRadius, portal.out.y - portalRadius, portalDiameter, portalDiameter);
        // pop()
    } 
}