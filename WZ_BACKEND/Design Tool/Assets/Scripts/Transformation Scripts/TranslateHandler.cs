using UnityEngine;
using System.Collections;
using System;

public class TranslateHandler : AbstractTransformHandler
{
    public override void onDrag(Vector3 from, Vector3 to)
    {
        double positionChange = projectionDelta(from, to, true);
        Vector3 translationVector = new Vector3(0, 0, 0);

        switch (myAxis)
        {
            case Axis.X:
                translationVector = new Vector3((float)positionChange, 0, 0);
                break;
            case Axis.Y:
                translationVector = new Vector3(0, (float)positionChange, 0);
                break;
            case Axis.Z:
                translationVector = new Vector3(0, 0, (float)positionChange);
                break;
        }

        transformedObject.transform.Translate(translationVector, Space.World);
        foreach (GameObject g in transFormationElements)
        {
            g.transform.Translate(translationVector, Space.World);
        }
    }
}

