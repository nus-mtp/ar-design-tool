using UnityEngine;
using System.Collections;
using System;

public class RotateHandler : AbstractTransformHandler
{
    private float perQuarter = 20.0f;

    public override void onDrag(Vector3 from, Vector3 to)
    {
        double angleChange = perQuarter * projectionPerpendicularDelta(from, to);
        float angleToRotate = (float)(angleChange * Math.PI) / (2.0f * 20);
        switch (myAxis)
        {
            case Axis.X:
                transformedObject.transform.RotateAround(new Vector3(transFormationElements[1].transform.position.x,transform.position.y,transform.position.z),Vector3.right,angleToRotate);
                break;
            case Axis.Y:
                transformedObject.transform.RotateAround(new Vector3(transform.position.x, transFormationElements[0].transform.position.y, transform.position.z), Vector3.up, angleToRotate);
                break;
            case Axis.Z:
                transformedObject.transform.RotateAround(new Vector3(transform.position.x, transform.position.y, transFormationElements[0].transform.position.z), Vector3.forward, angleToRotate);
                break;
        }
    }

}
