#if UNITY_EDITOR
using UnityEngine;
using System;
using System.Collections.Generic;

[Serializable]
public enum StateObjectType
{
    Model, Image, Text
}

[Serializable]
public class SerialStateObject
{
    public int id;
    public string instanceName;
    public string modelName;
    public SerialVector position;
    public SerialVector rotation;
    public SerialVector scale;
    public int transitionStateId;
    public StateObjectType type;

}

[Serializable]
public class SerialVector
{
    public float w;
    public float x;
    public float y;
    public float z;
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