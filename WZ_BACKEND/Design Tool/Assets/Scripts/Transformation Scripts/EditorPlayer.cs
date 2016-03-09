using UnityEngine;
using System.Collections;

public class EditorPlayer : MonoBehaviour {

    private GameObject toTransform;

    public void SetTransformMode(string val)
    {
        Transformable.SetTransformMode(val);
    }
}
