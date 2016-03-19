using UnityEngine;
using System.Collections;

public class TextStateObject:AbstractStateObject{

	 public TextStateObject(GameObject g)
    {
        gameObject = g;
        instanceName = g.name;
    }
}
