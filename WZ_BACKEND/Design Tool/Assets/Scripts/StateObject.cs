using UnityEngine;
using System;
using System.Collections.Generic;

[Serializable]
public class StateObject
{
    private SerialVector position;
    private SerialVector rotation;
    private SerialVector scale;
    public string modelName;

    public StateObject(GameObject g)
    {
        modelName = g.name;
        position = new SerialVector(g.transform.position);
        rotation = new SerialVector(g.transform.rotation);
        scale = new SerialVector(g.transform.localScale);
    }

    public void InitializeGameObject(GameObject g)
    {
        g.name = modelName;
        g.transform.position = position.ToVector3();
        g.transform.rotation = rotation.ToQuaternion();
        g.transform.localScale = scale.ToVector3();
    }
}

[Serializable]
class SerialVector
{
    public float x;
    public float y;
    public float z;
    public float w;

    public SerialVector(Quaternion q)
    {
        x = q.x;
        y = q.y;
        z = q.z;
        w = q.w;
    }

    public SerialVector(Vector3 v)
    {
        x = v.x;
        y = v.y;
        z = v.z;
    }

    public Quaternion ToQuaternion()
    {
        Quaternion q = new Quaternion(x, y, z, w);
        return q;
    }

    public Vector3 ToVector3()
    {
        Vector3 v = new Vector3(x, y, z);
        return v;
    }

}
