using UnityEngine;
using System.Collections;
using System;

abstract public class AbstractTransformHandler : MonoBehaviour
{
    public Axis myAxis;
    public GameObject[] transFormationElements = new GameObject[3];
    public GameObject transformedObject;

    abstract public void onDrag(Vector3 from, Vector3 to);

    public float projectionDelta(Vector3 from, Vector3 to, bool normalisedToWorld)
    {
        Vector2 transformHandler = Camera.main.WorldToScreenPoint(this.gameObject.transform.position);
        Vector2 origin = Camera.main.WorldToScreenPoint(transformedObject.transform.position);
        Vector2 axisScreen = transformHandler - origin;
        Vector3 axisWorld = this.gameObject.transform.position - transformedObject.transform.position;
        float worldToScreenScale = axisWorld.magnitude / axisScreen.magnitude;
        Vector2 mouseMovement = to - from;
        double projectionFromAxis = Vector2.Dot(mouseMovement, axisScreen) / (mouseMovement.magnitude * axisScreen.magnitude);
        if (Double.IsNaN(projectionFromAxis))
        {
            projectionFromAxis = 0;
        }
        if (normalisedToWorld)
        {
            return (float)(mouseMovement.magnitude * projectionFromAxis * worldToScreenScale);
        }
        else
        {
            return (float)(mouseMovement.magnitude * projectionFromAxis);
        }
    }

    public float projectionPerpendicularDelta(Vector3 from, Vector3 to)
    {
        Vector2 transformHandler = Camera.main.WorldToScreenPoint(this.gameObject.transform.position);
        Vector2 origin = Camera.main.WorldToScreenPoint(transformedObject.transform.position);
        Vector2 axisScreen = transformHandler - origin;
        Vector2 perpendicularAxisScreen = new Vector2(axisScreen.y * -1, axisScreen.x);
        Vector2 mouseMovement = to - from;
        double projectionFromAxis = Vector2.Dot(mouseMovement, perpendicularAxisScreen) / (mouseMovement.magnitude * perpendicularAxisScreen.magnitude);
        if (Double.IsNaN(projectionFromAxis))
        {
            projectionFromAxis = 0;
        }
        return (float)(mouseMovement.magnitude * projectionFromAxis);
    }

    public void removeParent()
    {
        foreach (GameObject g in transFormationElements)
        {
            if(g != gameObject)
                g.transform.parent = null;

        }
    }

    public void reAssignParent()
    {
        foreach (GameObject g in transFormationElements)
        {
            g.transform.SetParent(transformedObject.transform);

        }
    }

}
