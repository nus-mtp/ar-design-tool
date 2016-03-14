using UnityEngine;
using System.Collections;
using System;

public class ScaleHandler : AbstractTransformHandler
{

    public override void onDrag(Vector3 from, Vector3 to)
    {
        Vector2 transformHandler = Camera.main.WorldToScreenPoint(this.gameObject.transform.position);
        Vector2 origin = Camera.main.WorldToScreenPoint(transformedObject.transform.position);
        Vector3 scaleVector = transformedObject.transform.localScale;
        double distFromParent = (transformHandler - origin).magnitude;
        double positionChange = projectionDelta(from, to, false);
        switch (myAxis)
        {
            case Axis.X:
                transformedObject.transform.localScale = new Vector3(scaleVector.x * (float)(positionChange * (1 / distFromParent) + 1), scaleVector.y, scaleVector.z);
                break;
            case Axis.Y:
                transformedObject.transform.localScale = new Vector3(scaleVector.x, scaleVector.y * (float)(positionChange * (1 / distFromParent) + 1), scaleVector.z);
                break;
            case Axis.Z:
                transformedObject.transform.localScale = new Vector3(scaleVector.x, scaleVector.y, scaleVector.z * (float)(positionChange * (1 / distFromParent) + 1));
                break;
        }

    }


}
