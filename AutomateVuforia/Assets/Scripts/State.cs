using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System;

[Serializable]
public class State
{
    List<StateOjbect> stateObjects;

    public State(List<GameObject> gameObjects)
    {
        stateObjects = new List<StateOjbect>();
        foreach (GameObject g in gameObjects)
        {
            StateOjbect s = new StateOjbect(g);
            stateObjects.Add(s);
        }
    }

    [Serializable]
    class StateOjbect
    {
        public SerialVector position;
        public SerialVector rotation;
        public SerialVector scale; 
        string modelName;

        public StateOjbect(GameObject g)
        {
            modelName = g.name;
            position = new SerialVector(g.transform.position);
            rotation = new SerialVector(g.transform.rotation);
            scale = new SerialVector(g.transform.localScale);
        }
    }

    [Serializable]
    class SerialVector
    {
        public float x;
        public float y;
        public float z;
        public float w;

        public SerialVector(Quaternion q){
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

}
