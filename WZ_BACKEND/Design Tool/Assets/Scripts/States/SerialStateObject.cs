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
    public bool isStateChanger;
    public string modelName;
    public SerialVector position;
    public SerialVector rotation;
    public SerialVector scale;
    public int transitionStateId;
    public StateObjectType type;

    public SerialStateObject(StateObject s)
    {
        GameObject g = s.gameObject;
        instanceName = s.instanceName;
        modelName = g.name;
        position = new SerialVector(g.transform.position);
        rotation = new SerialVector(g.transform.rotation);
        scale = new SerialVector(g.transform.localScale);
        isStateChanger = s.isStateChanger;
        transitionStateId = s.transitionStateId;
        id = s.id;
        type = s.type;
    }

    public void InitializeStateObject(StateObject s)
    {
        GameObject g = s.gameObject;
        g.name = modelName;
        g.transform.position = position.ToVector3();
        g.transform.rotation = rotation.ToQuaternion();
        g.transform.localScale = scale.ToVector3();
        s.instanceName = instanceName;
        s.isStateChanger = isStateChanger;
        s.transitionStateId = transitionStateId;
        s.id = id;
        s.type = type;
    }
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
