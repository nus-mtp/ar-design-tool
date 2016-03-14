#if UNITY_EDITOR
using UnityEngine;
using System;
using System.Collections.Generic;

[Serializable]
public class SerialStateObject
{
    public SerialVector position;
    public SerialVector rotation;
    public SerialVector scale;
    public string modelName;
    public string instanceName;
    public bool isStateChanger;
    public int transitionStateId;
}

[Serializable]
public class SerialVector
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
#endif