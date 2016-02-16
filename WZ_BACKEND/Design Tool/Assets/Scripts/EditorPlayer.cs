using UnityEngine;
using System.Collections;

public class EditorPlayer : MonoBehaviour {

    private GameObject toTransform;
    private ObjectCollection objectCollection;

    public void SetTransformMode(string val)
    {
        Transformable.SetTransformMode(val);
    }

    void Start()
    {
        objectCollection = gameObject.GetComponent<ObjectCollection>();

    }
}
