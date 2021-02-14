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
        push()
            stroke("rgba(0,0,255,0.5)")
            fill("rgba(0,0,0,0.75)");
            
            strokeWeight(3)
            ellipse(portal.in.x - portalRadius, portal.in.y - portalRadius, postalDiameter, postalDiameter);
            ellipse(portal.out.x - portalRadius, portal.out.y - portalRadius, postalDiameter, postalDiameter);
        pop()
    } 
}